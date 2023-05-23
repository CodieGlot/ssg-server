import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import type { User } from '../users/entities';
import type { CreateBlogDto, UpdateBlogDto } from './dto/request';
import { Blog } from './entities';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>
    ) {}

    async create(dto: CreateBlogDto, author: string) {
        const postEntity = this.blogRepository.create({ ...dto, author });

        await this.blogRepository.save(postEntity);

        return new ResponseDto({ message: 'Blog created successfully' });
    }

    async findAll() {
        return this.blogRepository.find();
    }

    async findBlogById(id: string) {
        return this.blogRepository.findOne({ where: { id } });
    }

    async findAllBlogsOfUser(username: string) {
        return this.blogRepository.find({ where: { author: username } });
    }

    async updateBlogById(id: string, dto: UpdateBlogDto) {
        const blog = await this.findBlogById(id);

        if (!blog) {
            throw new NotFoundException('Blog Not Found');
        }

        await this.blogRepository.update(id, dto);

        return new ResponseDto({ message: 'Blog updated successfully' });
    }

    async deleteBlogById(id: string, user: User) {
        const blog = await this.findBlogById(id);

        if (!blog) {
            throw new NotFoundException('Blog Not Found');
        }

        if (blog.author !== user.username) {
            throw new UnauthorizedException('Unauthorized');
        }

        await this.blogRepository.delete(id);

        return new ResponseDto({ message: 'Blog deleted successfully' });
    }
}
