import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [MarketplaceController],
    providers: [MarketplaceService],
    exports: [MarketplaceService]
})
export class MarketplaceModule {}
