import { StringField } from '../../../../decorators';

export class AddCommentDto {
    @StringField()
    content: string;
}
