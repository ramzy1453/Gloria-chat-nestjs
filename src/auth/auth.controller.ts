import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IRegister, ILogin, CookieType } from './dto';
import { ConfigService } from '@nestjs/config';
import { Cookies, GetUser } from './dectorators';
import { MulterInterceptor } from '../interceptors';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @UseInterceptors(MulterInterceptor)
  @Post('register')
  async register(
    @Body() body: IRegister,
    @Cookies('refreshToken') cookie: CookieType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('wtf', file);
    const { user, accessToken, refreshToken } = await this.authService.register(
      body,
      file,
    );
    cookie.set<string>(refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(this.config.get('REFRESH_TOKEN_LIFETIME')),
    });
    return { ...user, accessToken };
  }

  @Post('login')
  async login(
    @Body() body: ILogin,
    @Cookies('refreshToken') cookie: CookieType,
  ) {
    const { user, accessToken, refreshToken } = await this.authService.login(
      body,
    );

    cookie.set<string>(refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(this.config.get('REFRESH_TOKEN_LIFETIME')),
    });

    return { ...user, accessToken };
  }

  @Delete('logout')
  logout(@Cookies('refreshToken') cookie: CookieType) {
    cookie.clear();
    return {
      message: 'Logout successful',
    };
  }

  @Get('refresh-token')
  async refresh(@Cookies('refreshToken') cookie: CookieType) {
    console.log(cookie.get());
    if (!cookie.get()) {
      throw new NotFoundException('Refresh token not found');
    }

    const { userId } = await this.authService.verifyToken(cookie.get(), {
      isRefreshToken: true,
    });
    const accessToken = await this.authService.createToken({ userId });
    return { accessToken };
  }
}
