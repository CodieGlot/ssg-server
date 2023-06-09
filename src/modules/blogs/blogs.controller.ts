import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { BlogsService } from './blogs.service';
import { Blog } from './entities';
import { AddCommentDto, CreateBlogDto } from './dto/request';
import { User } from '../users/entities';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    // TODO: ADD PAGINATION
    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Blog,
        description: 'Get all blogs'
    })
    @ApiOperation({ summary: 'Get all blogs' })
    async getAllBlogs() {
        return this.blogsService.findAllBlogs();
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Craete new blog'
    })
    @ApiOperation({ summary: 'Create new blog' })
    async createBlog(@Body() createBlogDto: CreateBlogDto) {
        return this.blogsService.createBlog(createBlogDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Blog,
        description: 'Get blog by id'
    })
    @ApiOperation({ summary: 'Get blog by id' })
    async getBlogById(@Param('id') id: string) {
        return this.blogsService.findBlogById(id);
    }

    @Post(':id/like')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Like blog by id'
    })
    @ApiOperation({ summary: 'Like blog by id' })
    async linkBlog(@Param('id') id: string) {
        return this.blogsService.likeBlog(id);
    }

    @Post(':id/comment')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Comment blog by id'
    })
    @ApiOperation({ summary: 'Comment blog by id' })
    async addComment(@Param('id') id: string, @Body() dto: AddCommentDto, @AuthUser() user: User) {
        return this.blogsService.addComment(id, user.username, dto);
    }
}
