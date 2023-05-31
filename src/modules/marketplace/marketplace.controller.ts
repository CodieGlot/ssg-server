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
import { CreateProductDto } from './dto/request';

@ApiTags('marketplace')
@Controller('marketplace')
export class MarketplaceController {
    constructor(private readonly marketplaceService: MarketplaceService) {}

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
}
