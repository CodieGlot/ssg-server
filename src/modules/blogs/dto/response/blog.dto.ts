import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { Blog } from '../../entities';

export class BlogDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    likes: number;

    constructor(dto: Blog) {
        super(dto);
        this.title = dto.title;
        this.content = dto.content;
        this.author = dto.author;
    }
}
