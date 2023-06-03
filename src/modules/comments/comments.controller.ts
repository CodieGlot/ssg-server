import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import {
    ApiAcceptedResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { CommentsService } from './comments.service';
import { Comment } from './entities';
import { CreateCommentDto, UpdateCommentDto } from './dto/request';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly marketplaceService: CommentsService) {}

    @Post('comment')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Create comment'
    })
    @ApiOperation({ summary: 'Create comment' })
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.marketplaceService.createComment(createCommentDto);
    }

    @Get('comment')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Comment,
        description: 'Get all comments'
    })
    @ApiOperation({ summary: 'Get all comments' })
    async getAllComments() {
        return this.marketplaceService.getAllComments();
    }

    @Get('comment/:id')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Comment,
        description: 'Get comment by id'
    })
    @ApiOperation({ summary: 'Get comment by id' })
    async getCommentById(@Param('id') id: string) {
        return this.marketplaceService.getCommentById(id);
    }

    @Patch('comment/:id')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Update comment by id'
    })
    @ApiOperation({ summary: 'Update comment by id' })
    async updateCommentById(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.marketplaceService.updateCommentById(id, updateCommentDto);
    }

    @Delete('comment/:id')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Delete comment by id'
    })
    @ApiOperation({ summary: 'Delete comment by id' })
    async deleteCommentById(@Param('id') id: string) {
        return this.marketplaceService.deleteCommentById(id);
    }
}
