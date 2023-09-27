import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IRoom } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async createRoom(
    name: string,
    adminId: string,
    file: Express.Multer.File | Buffer,
  ) {
    console.log(file, ' x');
    try {
      const image = await this.cloudinary.uploadImage(
        file,
        'rooms',
        'gloria-chat-app',
      );
      console.log(image, 'ok');

      console.log(image);
      const room = await this.prisma.room.create({
        data: {
          name,
          adminId,
          picture: image.secure_url,
          picturePublicId: image.public_id,
        },
        include: {
          joinedUsers: true,
        },
      });
      await this.joinRoom(room.id, adminId);
      return {
        ...room,
        isJoined: true,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getRooms(userId: string, query?: Partial<IRoom>) {
    const rooms = await this.prisma.room.findMany({
      where: query,
      include: {
        joinedUsers: true,
      },
    });

    rooms.forEach((room: any) => {
      room.isJoined = !!room.joinedUsers.find(
        (user: any) => user.id === userId,
      );

      console.log(!!room.joinedUsers.find((user: any) => user.id === userId));
    });

    return rooms;
  }

  async getRoom(id: string, userId: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        joinedUsers: true,
      },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const isJoined = await this.prisma.room.findUnique({
      where: {
        id,
        joinedUsers: {
          some: {
            id: userId,
          },
        },
      },
    });

    return { ...room, isJoined: !!isJoined };
  }

  async getFirstRoom(userId: string) {
    const room = await this.prisma.room.findFirst();
    if (!room) {
      return null;
    }

    const isJoined = await this.prisma.room.findFirst({
      where: {
        joinedUsers: {
          some: {
            id: userId,
          },
        },
      },
    });

    return { ...room, isJoined: !!isJoined };
  }

  async updateRoom(
    id: string,
    name: string,
    adminId: string,
    file: Express.Multer.File | Buffer,
  ) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.adminId !== adminId) {
      throw new BadRequestException(
        "You can't update a room that you don't own",
      );
    }

    const image = await this.cloudinary.updateImage(file, room.picture);

    const updatedRoom = await this.prisma.room.update({
      where: {
        id,
      },
      data: {
        name,
        picture: image.secure_url,
        picturePublicId: image.public_id,
      },
    });
    return updatedRoom;
  }

  async deleteRoom(id: string, adminId: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    console.log({
      givenId: adminId,
      imuId: room.adminId,
      isEq: room.adminId === adminId,
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.adminId !== adminId) {
      console.log('colonisation');
      throw new BadRequestException(
        "You can't delete a room that you don't own",
      );
    }

    const deletedMessages = await this.prisma.message.deleteMany({
      where: {
        roomId: id,
      },
    });
    const deletedRoom = await this.prisma.room.delete({
      where: {
        id,
      },
    });

    await this.cloudinary.deleteImage(room.picturePublicId);
    return deletedRoom;
  }

  async joinRoom(id: string, userId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        id,
        joinedUsers: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (room) {
      throw new BadRequestException("You're already in the room");
    }
    const updatedRoom = await this.prisma.room.update({
      where: {
        id,
      },
      data: {
        joinedUsers: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        joinedUsers: true,
      },
    });

    const { username } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return { ...updatedRoom, username };
  }

  async leaveRoom(id: string, userId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        id,
        joinedUsers: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!room) {
      throw new BadRequestException("You're not in the room");
    }

    const updatedRoom = await this.prisma.room.update({
      where: {
        id,
      },
      data: {
        joinedUsers: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        joinedUsers: true,
      },
    });
    return updatedRoom;
  }
}
