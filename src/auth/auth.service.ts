import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

import { JwtPayload, IRegister, ILogin } from './dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private cloudinary: CloudinaryService,
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(body: IRegister, file: Express.Multer.File) {
    const { username, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and confirmation password do not match',
      );
    }
    const hashedPassword = await this.hashPassword(password);

    const image = await this.cloudinary.uploadImage(
      file,
      'users',
      'gloria-chat-app',
    );
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        picture: image.secure_url,
        picturePublicId: image.public_id,
      },
    });

    const accessToken = await this.createToken({ userId: user.id });
    const refreshToken = await this.createToken(
      { userId: user.id },
      { isRefreshToken: true },
    );

    user.password = undefined;
    return { user, accessToken, refreshToken };
  }

  async login(body: ILogin) {
    const { username, password } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const accessToken = await this.createToken({ userId: user.id });
    const refreshToken = await this.createToken(
      { userId: user.id },
      { isRefreshToken: true },
    );

    user.password = undefined;
    return { user, accessToken, refreshToken };
  }

  async createToken(payload: JwtPayload, { isRefreshToken = false } = {}) {
    const tokenType = isRefreshToken ? 'REFRESH_TOKEN_' : 'ACCESS_TOKEN_';

    const token = this.jwt.signAsync(payload, {
      secret: this.config.get(tokenType + 'SECRET'),
      expiresIn: parseInt(this.config.get(tokenType + 'LIFETIME')),
    });
    return token;
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async verifyToken(token: string, { isRefreshToken = false } = {}) {
    if (!token) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    const tokenType = isRefreshToken ? 'REFRESH_TOKEN_' : 'ACCESS_TOKEN_';
    const payload = await this.jwt.verifyAsync(token, {
      secret: this.config.get(tokenType + 'SECRET'),
    });
    if (!payload) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    return payload as JwtPayload;
  }
}
