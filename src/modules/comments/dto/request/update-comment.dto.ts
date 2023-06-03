import {StringFieldOptional } from '../../../../decorators';

export class UpdateCommentDto {
    @StringFieldOptional()
    username: string;

    @StringFieldOptional()
    content: string;

}
