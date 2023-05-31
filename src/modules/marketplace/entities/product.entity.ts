import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { ProductDto } from '../dto/response';

@Entity()
@UseDto(ProductDto)
export class Product extends AbstractEntity<ProductDto> {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    description: string;
}
