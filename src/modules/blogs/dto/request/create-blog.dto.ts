import { StringField } from '../../../../decorators';

export class CreateBlogDto {
    @StringField({ example: 'BLOG_TITLE' })
    title: string;

    @StringField({ example: 'BLOG_CONTENT' })
    content: string;
}
