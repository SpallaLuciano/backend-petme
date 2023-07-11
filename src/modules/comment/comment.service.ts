import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Comment } from '../../entities';
import { ProfileService } from '../profile/profile.service';
import { CreateDto, UpdateDto } from './dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private profileService: ProfileService,
  ) {}

  async createComment(userId: string, dto: CreateDto): Promise<Comment> {
    const author = await this.profileService.findByUser(userId);
    const recipient = await this.profileService.findByUser(dto.recipientId);

    const comment = this.commentRepository.create({
      ...dto,
      author,
      recipient,
    });

    await this.commentRepository.save(comment);

    return comment;
  }

  async findOneById(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id: commentId });

    if (!comment) {
      throw new WarningException(
        'No se encontró el comentario para el id ingresado',
      );
    }

    return comment;
  }

  async updateComment(
    userId: string,
    commentId: string,
    dto: UpdateDto,
  ): Promise<Comment> {
    const comment = await this.findOneById(commentId);

    if (comment.author.id !== userId) {
      throw new WarningException('No autorizado');
    }

    const updatedComment = Object.assign(comment, dto);

    await this.commentRepository.save(updatedComment);

    return updatedComment;
  }

  async deleteComment(commentId: string, userId: string): Promise<Comment> {
    let comment = await this.findOneById(commentId);

    if (comment.author.id !== userId) {
      throw new WarningException('No tiene permisos para borrar el comentario');
    }

    comment = await this.commentRepository.remove(comment);

    return comment;
  }
}
