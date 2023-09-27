import { IsString, IsNotEmpty } from 'class-validator';

export class ILogin {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
