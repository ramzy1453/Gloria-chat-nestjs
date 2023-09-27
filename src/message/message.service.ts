import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  async create(text: string, roomId: string, userId: string) {
    if (!(await this.isUserInRoom(userId, roomId))) {
      console.log('Roi  f');

      throw new NotFoundException('User is not in room');
    }
    const message = await this.prisma.message.create({
      data: {
        text,
        room: {
          connect: {
            id: roomId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
        room: true,
      },
    });

    return message;
  }

  // async findAll() {
  //   const messages = await this.prisma.message.findMany({
  //     include: {
  //       user: true,
  //       room: true,
  //     },
  //   });
  //   return messages;
  // }

  async getLastMessage(roomId: string) {
    const message = await this.prisma.message.findFirst({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        room: true,
      },
    });

    if (!message) {
      return {
        text: 'Start conversation',
      };
    }
    return message;
  }
  async findAllByRoomId(roomId: string, userId: string) {
    if (!(await this.isUserInRoom(userId, roomId))) {
      console.log('Roi du one piece');
      throw new UnauthorizedException('User is not in room');
    }

    console.log('ok');
    const messages = await this.prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        user: true,
        room: true,
      },
    });

    return messages;
  }

  async findOne(roomId: string, id: string) {
    const message = await this.prisma.message.findUnique({
      where: {
        id,
        roomId,
      },
      include: {
        user: true,
        room: true,
      },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async update(roomId: string, userId: string, id: string, text: string) {
    if (!(await this.isUserInRoom(userId, roomId))) {
      throw new UnauthorizedException('User is not in room');
    }

    if (!(await this.isYourMessage(userId, id))) {
      throw new UnauthorizedException('You can not edit this message');
    }

    const updatedMessage = await this.prisma.message.update({
      where: {
        id,
        roomId,
      },
      data: {
        text,
      },
      include: {
        user: true,
        room: true,
      },
    });

    return updatedMessage;
  }

  async remove(roomId: string, userId: string, id: string) {
    if (!this.isUserInRoom(userId, roomId)) {
      throw new UnauthorizedException('User is not in room');
    }

    if (!this.isYourMessage(userId, id)) {
      throw new UnauthorizedException('You can not delete this message');
    }

    const deletedMessage = await this.prisma.message.delete({
      where: {
        id,
        roomId,
      },
    });

    return {
      message: 'Message deleted',
    };
  }

  async isUserInRoom(userId: string, roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        joinedUsers: {
          where: {
            id: userId,
          },
        },
      },
    });
    console.log(room.joinedUsers.length > 0);
    return room.joinedUsers.length > 0;
  }

  async isYourMessage(userId: string, id: string) {
    const message = await this.prisma.message.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });

    return message.user.id === userId;
  }
}
