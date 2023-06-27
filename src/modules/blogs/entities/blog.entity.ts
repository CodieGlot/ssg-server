import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { BlogDto } from '../dto/response';
import { Comment } from './comment.entity';

@Entity()
@UseDto(BlogDto)
export class Blog extends AbstractEntity<BlogDto> {
    @Column()
    postId: string;

    @Column({ type: 'int', default: 50 })
    likes: number;

    @OneToMany(() => Comment, (comment) => comment.blog, {
        cascade: true
    })
    comments: Comment[];
}
