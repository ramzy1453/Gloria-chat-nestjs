import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from '../room/room.gateway';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
