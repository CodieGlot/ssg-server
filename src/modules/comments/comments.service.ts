import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { Comment } from './entities';
import { CreateCommentDto, UpdateCommentDto } from './dto/request';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    async createComment(dto: CreateCommentDto) {
        const commentEntity = this.commentRepository.create({
            username: dto.username,
            content: dto.content,
        });

        await this.commentRepository.save(commentEntity);

        return new ResponseDto({ message: 'Comment created successfully' });
    }

    async getAllComments() {
        return this.commentRepository.find();
    }

    async getCommentById(id: string) {
        return this.commentRepository.findOne({ where: { id } });
    }

    async updateCommentById(id: string, dto: UpdateCommentDto) {
        const comment = await this.getCommentById(id);

        if (!comment) {
            throw new BadRequestException('Comment not found');
        }

        await this.commentRepository.update(id, dto);

        return new ResponseDto({ message: 'Comment updated successfully' });
    }

    async deleteCommentById(id: string) {
        const comment = await this.getCommentById(id);

        if (!comment) {
            throw new BadRequestException('Comment not found');
        }

        await this.commentRepository.delete(id);

        return new ResponseDto({ message: 'Comment deleted successfully' });
    }
}
