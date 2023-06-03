import { StringField } from 'src/decorators';

export class AddCommentDto {
    @StringField()
    content: string;
}
