import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { parseISO } from 'date-fns';
import { Chat, Profile } from '../../../entities';

export class MessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  datetime: string;
}

export class CreateMessageDto {
  chat: Chat;
  sender: Profile;
  receiver: Profile;
  content: string;
  datetime: string;
}
