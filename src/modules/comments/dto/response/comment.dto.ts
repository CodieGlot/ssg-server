import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import { Comment } from '../../entities';

export class CommentDto extends AbstractDto {
    username: string;

    content: string;

    constructor(comment: Comment) {
        super(comment);
        this.username = comment.username;
        this.content = comment.content;
    }
}
