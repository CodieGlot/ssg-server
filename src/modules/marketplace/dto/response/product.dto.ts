import { ProductType } from '../../../../constants';
import { AbstractDto } from '../../../../common/dto/abstract.dto';
import { Product } from '../../entities';

export class ProductDto extends AbstractDto {
    name: string;

    price: number;

    imageUrl: string;

    type: ProductType;

    description: string;

    constructor(product: Product) {
        super(product);
        this.name = product.name;
        this.price = product.price;
        this.imageUrl = product.imageUrl;
        this.type = product.type;
        this.description = product.description;
    }
}
