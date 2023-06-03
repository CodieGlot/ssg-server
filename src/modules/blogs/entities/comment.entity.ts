import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    //createdAt: Date;

    @Column()
    content: string;

    @ManyToOne(() => Blog, (blog) => blog.comments, {
        onDelete: 'CASCADE'
    })
    blog: Blog;
}
