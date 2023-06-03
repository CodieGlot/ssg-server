import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { User } from '../users/entities';
import { BlogsService } from './blogs.service';
import { Blog } from './entities';
import { AddCommentDto } from './dto/request';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    // TODO: ADD PAGINATION
    @Get('')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Blog,
        description: 'Get all blogs'
    })
    @ApiOperation({ summary: 'Get all blogs' })
    async getAllBlogs() {
        return this.blogsService.findAllBlogs();
    }

    @Get(':id')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Blog,
        description: 'Get blog by id'
    })
    @ApiOperation({ summary: 'Get blog by id' })
    async getBlogById(@Param('id') id: string) {
        return this.blogsService.findBlogById(id);
    }

    // TODO: ADD AUTH-USER LATER
    @Post(':id/comment')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Comment blog by id'
    })
    @ApiOperation({ summary: 'Comment blog by id' })
    async addComment(@Param('id') id: string, @Body() dto: AddCommentDto) {
        return this.blogsService.addComment(id, dto);
    }
}
