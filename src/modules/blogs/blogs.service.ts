import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
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

    async likeBlog(id: string) {
        const blog = await this.findBlogById(id, false);

        await this.blogRepository.update({ id }, { likes: blog.likes + 1 });

        return new ResponseDto({ message: 'Like blog successfully' });
    }

    async addComment(id: string, username: string, dto: AddCommentDto) {
        const blog = await this.findBlogById(id);

        const commentEntity = this.commentRepository.create({ username, content: dto.content });

        blog.comments.push(commentEntity);

        await this.blogRepository.save(blog);

        return new ResponseDto({ message: 'Add comment successfully' });
    }
}
