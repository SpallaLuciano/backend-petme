import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Response, successResponse } from '../../common';
import { Comment } from '../../entities';
import { CommentService } from './comment.service';
import { CreateDto, UpdateDto } from './dtos';

@ApiTags('Comentarios')
@Controller('coments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Response<Comment>> {
    const comment = await this.commentService.findOneById(id);

    return successResponse(comment);
  }

  @Auth()
  @Post()
  async create(@Request() req, dto: CreateDto): Promise<Response<Comment>> {
    const comment = await this.commentService.createComment(req.user.id, dto);

    return successResponse(comment);
  }

  @Auth()
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    dto: UpdateDto,
  ): Promise<Response<Comment>> {
    const comment = await this.commentService.updateComment(
      req.user.id,
      id,
      dto,
    );

    return successResponse(comment);
  }

  @Auth()
  @Delete(':id')
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Response<Comment>> {
    const comment = await this.commentService.deleteComment(id, req.user.id);

    return successResponse(comment);
  }
}
