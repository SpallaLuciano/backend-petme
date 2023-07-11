import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message } from '../../entities';
import { ProfileModule } from '../profile/profile.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), ProfileModule],
  providers: [ChatGateway, ChatService, MessageService],
  controllers: [ChatController],
})
export class ChatModule {}
