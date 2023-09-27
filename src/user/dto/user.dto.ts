import { IsNotEmpty, IsString } from 'class-validator';

export class IUser {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  picture: string;
}
