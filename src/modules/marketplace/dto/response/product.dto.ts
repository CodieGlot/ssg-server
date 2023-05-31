import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import { Product } from '../../entities';

export class ProductDto extends AbstractDto {
    name: string;

    price: number;

    imageUrl?: string;

    description?: string;

    constructor(product: Product) {
        super(product);
        this.name = product.name;
        this.price = product.price;
        this.imageUrl = product?.imageUrl;
        this.description = product?.description;
    }
}
