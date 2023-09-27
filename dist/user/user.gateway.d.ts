import { UserService } from './user.service';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
export declare class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private authService;
    server: Server;
    constructor(userService: UserService, authService: AuthService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    updateUser(client: Socket, accessToken: string): Promise<void>;
    deleteUser(client: Socket, accessToken: string): Promise<void>;
}
