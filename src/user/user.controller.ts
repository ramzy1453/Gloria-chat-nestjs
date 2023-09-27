import { MulterInterceptor } from './../interceptors/multer.interceptor';
import {
  Controller,
  Query,
  Get,
  UseInterceptors,
  Body,
  UploadedFile,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './dto';
import { GetUser } from 'src/auth/dectorators';
import { AuthJwtGuard } from 'src/auth/guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: Partial<IUser>) {
    return this.userService.findAll(query);
  }

  @UseGuards(AuthJwtGuard)
  @Get('joined-rooms')
  getJoinedRooms(@GetUser('id') userId: string) {
    return this.userService.getJoinedRooms(userId);
  }

  @UseGuards(AuthJwtGuard)
  @Get('created-rooms')
  getCreatedRooms(@GetUser('id') userId: string) {
    return this.userService.getCreatedRooms(userId);
  }

  @UseGuards(AuthJwtGuard)
  @Get('is-in-room/:roomId')
  isInRoom(@GetUser('id') userId: string, @Param('roomId') roomId: string) {
    return this.userService.isInRoom(userId, roomId);
  }

  @UseGuards(AuthJwtGuard)
  @Get('account')
  getCurrentUser(@GetUser('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @UseInterceptors(MulterInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<IUser>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.update(id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
