import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from '../auth/guards';
import { MessageService } from './message.service';
import { GetUser } from '../auth/dectorators';

@UseGuards(AuthJwtGuard)
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post(':roomId')
  create(
    @Param('roomId') roomId: string,
    @Body('text') text: string,
    @GetUser('id') userId: string,
  ) {
    console.log(roomId);
    return this.messageService.create(text, roomId, userId);
  }

  // @Get()
  // findAll() {
  //   return this.messageService.findAll();
  // }

  @UseGuards(AuthJwtGuard)
  @Get(':roomId')
  findAllByRoomId(
    @Param('roomId') roomId: string,
    @GetUser('id') userId: string,
  ) {
    return this.messageService.findAllByRoomId(roomId, userId);
  }

  @Get(':roomId/last-message')
  getLastMessage(@Param('roomId') roomId: string) {
    return this.messageService.getLastMessage(roomId);
  }

  @Get(':roomId/:messageId')
  findOne(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.findOne(roomId, messageId);
  }

  @Patch(':roomId/:messageId')
  update(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @Body('text') text: string,
    @GetUser('id') userId: string,
  ) {
    return this.messageService.update(roomId, userId, messageId, text);
  }

  @Delete(':roomId/:messageId')
  remove(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @GetUser('id') userId: string,
  ) {
    return this.messageService.remove(roomId, userId, messageId);
  }
}
