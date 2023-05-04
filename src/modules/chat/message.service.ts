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
    const message = this.messageRepository.create(dto);

    return await this.messageRepository.save(message);
  }
}
