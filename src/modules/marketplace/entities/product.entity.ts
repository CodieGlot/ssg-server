import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { ProductDto } from '../dto/response';
import { ProductType } from '../../../constants';

@Entity()
@UseDto(ProductDto)
export class Product extends AbstractEntity<ProductDto> {
    @Column()
    name: string;

    @Column({ type: 'int' })
    price: number;

    @Column()
    imageUrl: string;

    @Column({ type: 'enum', enum: ProductType })
    type: ProductType;

    @Column()
    description: string;
}
