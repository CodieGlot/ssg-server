import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto/request';

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

        return new ResponseDto({ message: 'Product created successfully' });
    }

    async getProductById(id: string) {
        return this.productRepository.findOne({ where: { id } });
    }

    async updateProductById(id: string, dto: UpdateProductDto) {
        const product = await this.getProductById(id);

        if (!product) {
            throw new BadRequestException('Product not found');
        }

        await this.productRepository.update(id, dto);

        return new ResponseDto({ message: 'Product updated successfully' });
    }

    async deleteProductById(id: string) {
        const product = await this.getProductById(id);

        if (!product) {
            throw new BadRequestException('Product not found');
        }

        await this.productRepository.delete(id);

        return new ResponseDto({ message: 'Product deleted successfully' });
    }
}
