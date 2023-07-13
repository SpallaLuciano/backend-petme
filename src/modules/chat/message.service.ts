import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities';
import { CreateMessageDto } from './dtos';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(dto: CreateMessageDto) {
    let message = this.messageRepository.create(dto);

    message = await this.messageRepository.save(message);

    return await this.messageRepository.findOne({
      where: { id: message.id },
      relations: { chat: { messages: true } },
      loadRelationIds: {
        relations: ['sender', 'receiver'],
      },
    });
  }
}
