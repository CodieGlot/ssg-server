import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { Blog, Comment } from './entities';
import { AddCommentDto, CreateBlogDto } from './dto/request';

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

    async findBlogById(postId: string, getComments = true) {
        const blog = getComments
            ? await this.blogRepository.findOne({ where: { postId }, relations: ['comments'] })
            : await this.blogRepository.findOne({ where: { postId } });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async createBlog(dto: CreateBlogDto) {
        const blogEntity = await this.blogRepository.create(dto);

        await this.blogRepository.save(blogEntity);

        return new ResponseDto({ message: 'Create blog successfully' });
    }

    async likeBlog(postId: string) {
        const blog = await this.findBlogById(postId, false);

        await this.blogRepository.update({ postId }, { likes: blog.likes + 1 });

        return new ResponseDto({ message: 'Like blog successfully' });
    }

    async addComment(postId: string, username: string, dto: AddCommentDto) {
        const blog = await this.findBlogById(postId);

        const commentEntity = this.commentRepository.create({ username, content: dto.content });

        blog.comments.push(commentEntity);

        await this.blogRepository.save(blog);

        return new ResponseDto({ message: 'Add comment successfully' });
    }
}
