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

  async createComment(userId: string, dto: CreateDto) {
    const author = await this.profileService.findByUser(userId);

    if (author.id === dto.profileId) {
      throw new WarningException('No se pueden cargar comentarios de si mismo');
    }

    const comment = this.commentRepository.create({
      ...dto,
      author,
      recipient: { id: dto.profileId },
    });

    await this.commentRepository.save(comment);

    const recipient = await this.profileService.findById(dto.profileId);
    const authorUpdated = await this.profileService.findByUser(userId);

    return { recipient, author: authorUpdated };
  }

  async findOneById(commentId: string, relations?: string[]): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations,
    });

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

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.findOneByIdAndUser(commentId, userId);

    await this.commentRepository.remove(comment);

    const recipient = this.profileService.findById(
      comment.recipient as unknown as string,
    );
    const author = this.profileService.findById(
      comment.author as unknown as string,
    );

    return { recipient: await recipient, author: await author };
  }

  async findOneByIdAndUser(commentId: string, userId: string) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoin('comment.author', 'author', 'author.userId = :userId', {
        userId,
      })
      .loadRelationIdAndMap('comment.author', 'comment.author')
      .loadRelationIdAndMap('comment.recipient', 'comment.recipient')
      .where('comment.id = :commentId', { commentId })
      .getOne();

    if (!comment) {
      throw new WarningException('No se encontro el comentario');
    }

    return comment;
  }
}
