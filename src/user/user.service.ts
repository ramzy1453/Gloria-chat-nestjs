import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
  async findAll(query?: Partial<IUser>) {
    const users = await this.prisma.user.findMany({
      where: query,
      include: {
        joinedRooms: {
          select: {
            id: true,
          },
        },
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        joinedRooms: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, body: Partial<IUser>, file: Express.Multer.File) {
    const { picturePublicId } = await this.prisma.user.findUnique({
      where: { id },
      select: { picturePublicId: true },
    });

    const image = await this.cloudinary.updateImage(file, picturePublicId);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...body,
        picture: image.secure_url,
        picturePublicId: image.public_id,
      },
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'User deleted successfully',
    };
  }

  async getJoinedRooms(id: string) {
    const rooms = await this.prisma.room.findMany({
      where: {
        joinedUsers: {
          some: {
            id,
          },
        },
      },
    });

    return rooms;
  }

  async getCreatedRooms(id: string) {
    console.log(id);
    const rooms = await this.prisma.room.findMany({
      where: {
        adminId: id,
      },
    });

    return rooms;
  }

  async isInRoom(userId: string, roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
        joinedUsers: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        joinedUsers: true,
      },
    });

    if (!room)
      return {
        isJoined: false,
      };

    return { ...room, isJoined: true };
  }
}
