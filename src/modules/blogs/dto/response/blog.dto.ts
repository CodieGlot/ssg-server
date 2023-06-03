import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { Blog } from '../../entities';

export class BlogDto extends AbstractDto {
    @ApiProperty()
    postId: string;

    @ApiProperty()
    likes: number;

    constructor(dto: Blog) {
        super(dto);
        this.postId = dto.postId;
        this.likes = dto.likes;
    }
}
