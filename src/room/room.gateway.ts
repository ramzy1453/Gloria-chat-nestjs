import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import * as fs from 'fs/promises';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
  ) {}

  afterInit(server: Server) {}
  handleConnection(client: Socket, ...args: any[]) {}
  handleDisconnect(client: Socket) {}

  @SubscribeMessage('create-room')
  async createRoom(
    client: Socket,
    [name, description, accessToken, image]: [string, string, string, Buffer],
  ) {

    const { userId } = await this.authService.verifyToken(accessToken);
    const room = await this.roomService.createRoom(name, userId, image);
    client.join(room.id);
    this.server.emit('create-room', room);
  }

  @SubscribeMessage('delete-room')
  async deleteRoom(client: Socket, [roomId, accessToken]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const room = await this.roomService.deleteRoom(roomId, userId);
    client.leave(room.id);
    this.server.emit('delete-room', room);
  }

  @SubscribeMessage('update-room')
  async updateRoom(client: Socket, [roomId, name, accessToken]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const image = {} as Express.Multer.File;

    const room = await this.roomService.updateRoom(roomId, name, userId, image);
    this.server.emit('update-room', room);
  }

  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, [roomId, accessToken]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const room = await this.roomService.joinRoom(roomId, userId);
    client.join(room.id);
    this.server.emit('join-room', room);
  }

  @SubscribeMessage('leave-room')
  async leaveRoom(client: Socket, [roomId, accessToken]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const room = await this.roomService.leaveRoom(roomId, userId);
    client.leave(room.id);
    this.server.emit('leave-room', room);
  }
}
