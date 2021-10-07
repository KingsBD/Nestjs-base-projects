import { Module } from '@nestjs/common';
import { DatabaseTypeORMMongoDBConfigService } from './config.service';
import configuration from './configuration';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('type-orm-mongodb.url'),
        database: configService.get('type-orm-mongodb.database'),
        entities: [__dirname + '../../../../../**/*.entity{.ts,.js}'],
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [DatabaseTypeORMMongoDBConfigService],
  exports: [DatabaseTypeORMMongoDBConfigService],
})
export class DatabaseTypeORMMongoDBConfigModule {}
