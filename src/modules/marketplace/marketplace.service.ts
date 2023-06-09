import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { Product } from './entities';
import { CreateMultipleProductsDto, CreateProductDto, UpdateProductDto } from './dto/request';

@Injectable()
export class MarketplaceService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async createProduct(dto: CreateProductDto) {
        const productEntity = this.productRepository.create(dto);

        await this.productRepository.save(productEntity);

        return new ResponseDto({ message: 'Product created successfully' });
    }

    async createMultipleProducts(dto: CreateMultipleProductsDto) {
        const promiseSaveProducts = dto.products.map((product) => {
            const productEntity = this.productRepository.create(product);

            return this.productRepository.save(productEntity);
        });

        await Promise.all(promiseSaveProducts);

        return new ResponseDto({ message: 'Products created successfully' });
    }

    async getAllProducts() {
        return this.productRepository.find();
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
