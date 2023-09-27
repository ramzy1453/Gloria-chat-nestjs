/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
export declare class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private roomService;
    private authService;
    server: Server;
    constructor(roomService: RoomService, authService: AuthService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    createRoom(client: Socket, [name, description, accessToken, image]: [string, string, string, Buffer]): Promise<void>;
    deleteRoom(client: Socket, [roomId, accessToken]: string[]): Promise<void>;
    updateRoom(client: Socket, [roomId, name, accessToken]: string[]): Promise<void>;
    joinRoom(client: Socket, [roomId, accessToken]: string[]): Promise<void>;
    leaveRoom(client: Socket, [roomId, accessToken]: string[]): Promise<void>;
}
