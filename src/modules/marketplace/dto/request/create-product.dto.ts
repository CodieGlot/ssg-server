import { NumberField, StringField } from '../../../../decorators';

export class CreateProductDto {
    @StringField()
    name: string;

    @NumberField({ int: true, minimum: 1000 })
    price: number;

    @StringField()
    imageUrl: string;

    @StringField()
    type: string;

    @StringField()
    description: string;
}
