import { StringField } from '../../../../decorators';

export class CreateBlogDto {
    @StringField()
    postId: string;
}
