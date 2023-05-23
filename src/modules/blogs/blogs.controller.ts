import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { User } from '../users/entities';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/request/create-blog.dto';
import { UpdateBlogDto } from './dto/request/update-blog.dto';
import { BlogDto } from './dto/response';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    @Post()
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Create new blog'
    })
    @ApiOperation({ summary: 'Create new blog' })
    async create(@Body() createBlogDto: CreateBlogDto, @AuthUser() user: User) {
        return this.blogsService.create(createBlogDto, user.username);
    }

    @Get()
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: [BlogDto],
        description: 'Find all blogs'
    })
    @ApiOperation({ summary: 'Find all blogs' })
    async findAll() {
        return this.blogsService.findAll();
    }

    @Get(':id')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: BlogDto,
        description: 'Find blog by id'
    })
    @ApiOperation({ summary: 'Find blog by id' })
    async findBlogById(@Param('id') id: string) {
        return this.blogsService.findBlogById(id);
    }

    @Get('user/:username')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: [BlogDto],
        description: 'Find all blogs of a user'
    })
    @ApiOperation({ summary: 'Find all blogs of a user' })
    async findAllBlogsOfUser(@Param('username') username: string) {
        return this.blogsService.findAllBlogsOfUser(username);
    }

    @Patch(':id')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Update blog by id'
    })
    @ApiOperation({ summary: 'Update blog by id' })
    async updateBlogById(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogsService.updateBlogById(id, updateBlogDto);
    }

    @Delete(':id')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Delete blog by id'
    })
    @ApiOperation({ summary: 'Delete blog by id' })
    async deleteBlogById(@Param('id') id: string, @AuthUser() user: User) {
        return this.blogsService.deleteBlogById(id, user);
    }
}
