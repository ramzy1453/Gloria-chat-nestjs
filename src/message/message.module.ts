import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
