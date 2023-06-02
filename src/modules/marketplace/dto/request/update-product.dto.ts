import { NumberFieldOptional, StringFieldOptional } from '../../../../decorators';

export class UpdateProductDto {
    @StringFieldOptional()
    name: string;

    @NumberFieldOptional({ int: true, example: 10000 })
    price: number;

    @StringFieldOptional()
    imageUrl: string;

    @StringFieldOptional()
    description: string;
}
