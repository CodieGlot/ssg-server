import { NumberField, StringField } from '../../../../decorators';

export class CreateProductDto {
    @StringField()
    name: string;

    @NumberField({ minimum: 0 })
    price: number;

    @StringField()
    imageUrl: string;

    @StringField()
    description: string;
}
