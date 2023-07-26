import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuth } from '../../common';
import { ProfileService } from '../profile/profile.service';
import { ChatService } from './chat.service';
import { MessageDto } from './dtos';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONT_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients = new Map<string, Socket>();

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private profileService: ProfileService,
  ) {}

  @WsAuth()
  async handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake['user'].id;
    const profile = await this.profileService.findByUser(userId);

    this.connectedClients.set(profile.id, client);
  }

  @WsAuth()
  handleDisconnect(client: Socket) {
    const id = client.handshake['user'].id;
    this.connectedClients.delete(id);
  }

  @SubscribeMessage('new-message')
  async handleSendToUser(client: Socket, dto: MessageDto) {
    const userId = client.handshake['user'].id;

    const sender = await this.profileService.findByUser(userId);
    const receiver = await this.profileService.findById(dto.receiverId);

    let chat = await this.chatService.findChatByUsers([sender, receiver]);

    if (!chat) {
      chat = await this.chatService.create({ users: [sender, receiver] });
    }

    const message = await this.messageService.create({
      chat,
      receiver,
      sender,
      content: dto.content,
      datetime: dto.datetime,
    });

    client.emit('message', message);

    const receiverSocket = this.connectedClients.get(dto.receiverId);

    if (receiverSocket) {
      receiverSocket.emit('message', message);
    }
  }
}
