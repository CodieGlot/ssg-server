import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { Product } from './entities';
import { CreateProductDto } from './dto/request';

@Injectable()
export class MarketplaceService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async createProduct(dto: CreateProductDto) {
        const productEntity = this.productRepository.create({
            name: dto.name,
            price: dto.price,
            imageUrl: dto.imageUrl,
            description: dto.description
        });

        await this.productRepository.save(productEntity);

        return new ResponseDto({ message: 'Product created' });
    }

    async getProductById(id: string) {
        return this.productRepository.findOne({ where: { id } });
    }
}
