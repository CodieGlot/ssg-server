import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { BlogDto } from '../dto/response';

@Entity()
@UseDto(BlogDto)
export class Blog extends AbstractEntity<BlogDto> {
    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column()
    author: string;

    @Column({ type: 'int', default: 0 })
    likes: number;
}
