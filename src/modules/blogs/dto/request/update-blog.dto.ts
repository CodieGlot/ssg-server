import { StringField } from '../../../../decorators';

export class UpdateBlogDto {
    @StringField()
    title: string;

    @StringField()
    content: string;
}
