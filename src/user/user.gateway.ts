import { UserService } from './user.service';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from '../room/room.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class UserGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  afterInit(server: Server) {}
  handleConnection(client: Socket, ...args: any[]) {}
  handleDisconnect(client: Socket) {}

  @SubscribeMessage('update-user')
  async updateUser(client: Socket, accessToken: string) {
    const { userId } = await this.authService.verifyToken(accessToken);

    const user = await this.userService.findOne(userId);
    this.server.emit('update-user', user);
  }

  @SubscribeMessage('delete-user')
  async deleteUser(client: Socket, accessToken: string) {
    const { userId } = await this.authService.verifyToken(accessToken);
    const user = await this.userService.remove(userId);
    this.server.emit('delete-user', user);
  }
}
