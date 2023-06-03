import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {}
