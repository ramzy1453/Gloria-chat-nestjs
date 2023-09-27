import { MulterInterceptor } from './../interceptors/multer.interceptor';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IRoom } from './dto';
import { GetUser } from 'src/auth/dectorators';
import { AuthJwtGuard } from 'src/auth/guards';
import { RoomService } from './room.service';

@UseGuards(AuthJwtGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get()
  getRooms(@GetUser('id') userId: string, @Query() query: Partial<IRoom>) {
    return this.roomService.getRooms(userId, query);
  }

  @Get('first')
  getFirstRoom(@GetUser('id') userId: string) {
    return this.roomService.getFirstRoom(userId);
  }

  @Get(':id')
  getRoom(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.roomService.getRoom(id, userId);
  }

  @Post()
  @UseInterceptors(MulterInterceptor)
  createRoom(
    @Body() body: IRoom,
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(body, userId);
    return this.roomService.createRoom(body.name, userId, file);
  }

  @Post(':id')
  @UseInterceptors(MulterInterceptor)
  updateRoom(
    @Param('id') id: string,
    @Body() body: IRoom,
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomService.updateRoom(id, body.name, userId, file);
  }

  @Delete(':id')
  deleteRoom(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.roomService.deleteRoom(id, userId);
  }

  @Post('join/:id')
  joinRoom(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.roomService.joinRoom(id, userId);
  }

  @Post('leave/:id')
  leaveRoom(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.roomService.leaveRoom(id, userId);
  }
}
