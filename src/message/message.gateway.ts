import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { IMessage } from './dto';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  afterInit(server: Server) {}
  handleConnection(client: Socket, ...args: any[]) {}
  handleDisconnect(client: Socket) {}

  @SubscribeMessage('create-message')
  async create(client: Socket, [text, accessToken, roomId]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const message = await this.messageService.create(text, roomId, userId);

    // this.server.to(roomId).emit('create-message', message);
    this.server.emit('create-message', message);
  }

  @SubscribeMessage('delete-message')
  async delete(client: Socket, [messageId, accessToken, roomId]: string[]) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const message = await this.messageService.remove(roomId, userId, messageId);
    this.server.to(roomId).emit('delete-message', message);
  }

  @SubscribeMessage('update-message')
  async update(
    client: Socket,
    [messageId, text, accessToken, roomId]: string[],
  ) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const message = await this.messageService.update(
      roomId,
      userId,
      messageId,
      text,
    );
    this.server.to(roomId).emit('update-message', message);
  }
}
