import { ProductType } from '../../../../constants';
import { EnumField, NumberField, StringField } from '../../../../decorators';

export class CreateProductDto {
    @StringField()
    name: string;

    @NumberField({ int: true, minimum: 1 })
    price: number;

    @StringField()
    imageUrl: string;

    @EnumField(() => ProductType)
    type: ProductType;

    @StringField()
    description: string;
}
