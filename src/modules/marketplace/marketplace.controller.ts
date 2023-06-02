import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import {
    ApiAcceptedResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { MarketplaceService } from './marketplace.service';
import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto/request';

@ApiTags('marketplace')
@Controller('marketplace')
export class MarketplaceController {
    constructor(private readonly marketplaceService: MarketplaceService) {}

    @Post('product')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: ResponseDto,
        description: 'Create product'
    })
    @ApiOperation({ summary: 'Create product' })
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.marketplaceService.createProduct(createProductDto);
    }

    @Get('product')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Product,
        description: 'Get all products'
    })
    @ApiOperation({ summary: 'Get all products' })
    async getAllProducts() {
        return this.marketplaceService.getAllProducts();
    }

    @Get('product/:id')
    //@Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: Product,
        description: 'Get product by id'
    })
    @ApiOperation({ summary: 'Get product by id' })
    async getProductById(@Param('id') id: string) {
        return this.marketplaceService.getProductById(id);
    }

    @Patch('product/:id')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Update product by id'
    })
    @ApiOperation({ summary: 'Update product by id' })
    async updateProductById(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.marketplaceService.updateProductById(id, updateProductDto);
    }

    @Delete('product/:id')
    //@Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Delete product by id'
    })
    @ApiOperation({ summary: 'Delete product by id' })
    async deleteProductById(@Param('id') id: string) {
        return this.marketplaceService.deleteProductById(id);
    }
}
