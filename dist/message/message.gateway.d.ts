import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { AuthService } from 'src/auth/auth.service';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messageService;
    private authService;
    server: Server;
    constructor(messageService: MessageService, authService: AuthService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    create(client: Socket, [text, accessToken, roomId]: string[]): Promise<void>;
    delete(client: Socket, [messageId, accessToken, roomId]: string[]): Promise<void>;
    update(client: Socket, [messageId, text, accessToken, roomId]: string[]): Promise<void>;
}
