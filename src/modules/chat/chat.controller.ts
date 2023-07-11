import { Controller, Get, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth, Response, successResponse } from '../../common';
import { ApiTags } from '@nestjs/swagger';
import { Chat } from '../../entities';

@ApiTags('Carga de chats')
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Auth()
  @Get()
  async find(@Request() req): Promise<Response<Chat[]>> {
    const chats = await this.chatService.findAllChatsByUser(req.user.id);

    return successResponse(chats);
  }
}
