import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog, Comment } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Blog, Comment])],
    controllers: [BlogsController],
    providers: [BlogsService]
})
export class BlogsModule {}
