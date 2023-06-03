import { StringField } from '../../../../decorators';

export class CreateCommentDto {
    @StringField()
    username: string;

    @StringField()
    content: string;
}