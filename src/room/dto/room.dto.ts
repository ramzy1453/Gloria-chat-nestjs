import { IsString } from 'class-validator';

export class IRoom {
  @IsString()
  name?: string;
}
