import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './configuration';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { DatabaseMySqlConfigService } from './config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('mySql.host'),
        port: +configService.get('mySql.port'),
        username: configService.get('mySql.username'),
        password: configService.get('mySql.password'),
        database: configService.get('mySql.database'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [DatabaseMySqlConfigService],
  exports: [DatabaseMySqlConfigService],
})
export class DatabaseMySqlConfigModule {}
