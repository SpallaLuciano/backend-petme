import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Chat, Profile } from '../../entities';
import { CreateChatDto } from './dtos';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create(dto: CreateChatDto) {
    let chat = await this.findChatByUsers(dto.users);

    if (chat) {
      throw new WarningException('El chat ya se encuentra creado');
    }

    chat = this.chatRepository.create(dto);

    return await this.chatRepository.save(chat);
  }

  async findChatByUsers(users: [Profile, Profile]) {
    const profilesToInclude = users.map((user) => user.id);

    const chat = await this.chatRepository
      .createQueryBuilder('chats')
      .leftJoinAndSelect('chats.users', 'profile')
      .where('profile.id IN (:...ids)', { ids: profilesToInclude })
      .getOne();

    return chat;
  }

  async findAllChatsByUser(userId: string) {
    const chats = await this.chatRepository
      .createQueryBuilder('chats')
      .leftJoinAndSelect('chats.messages', 'messages')
      .innerJoin('chats.users', 'users', 'users.userId = :userId', { userId })
      .loadRelationIdAndMap('chats.users', 'chats.users')
      .loadRelationIdAndMap('messages.sender', 'messages.sender')
      .loadRelationIdAndMap('messages.receiver', 'messages.receiver')
      .getMany();

    return chats;
  }
}
