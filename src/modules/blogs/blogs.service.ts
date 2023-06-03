import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import type { User } from '../users/entities';
import { Blog, Comment } from './entities';
import { AddCommentDto } from './dto/request';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    async findAllBlogs() {
        return this.blogRepository.find();
    }

    async findBlogById(id: string, getComments = true) {
        const blog = getComments
            ? await this.blogRepository.findOne({ where: { id }, relations: ['comments'] })
            : await this.blogRepository.findOne({ where: { id } });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async addComment(id: string, dto: AddCommentDto) {
        const blog = await this.findBlogById(id);

        const commentEntity = this.commentRepository.create({ username: 'Anonymous', content: dto.content });

        blog.comments.push(commentEntity);

        await this.blogRepository.save(blog);

        return new ResponseDto({ message: 'Add comment successfully' });
    }
}
