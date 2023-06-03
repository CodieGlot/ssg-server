import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { CommentDto } from '../dto/response';
@Entity()
@UseDto(CommentDto)
export class Comment extends AbstractEntity<CommentDto> {
    @Column()
    username: string;

    @Column()
    content: string;
}