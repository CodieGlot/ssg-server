import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) => configService.postgresConfig,
            inject: [ApiConfigService]
        }),
        AuthModule,
        UsersModule,
        ScheduleModule.forRoot(),
        BlogsModule,
        MarketplaceModule,
        QuizModule
    ],
    providers: []
})
export class AppModule {}
