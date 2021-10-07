import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
// import { DatabaseMySqlConfigModule } from './config/database/mysql/config.module';
// import { DatabaseMongoDBConfigModule } from './config/database/mongodb/config.module';
import { DatabaseTypeORMMongoDBConfigModule } from './config/database/typeORM/mongodb/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    // DatabaseMySqlConfigModule,
    // DatabaseMongoDBConfigModule,
    // DatabaseMongoDBConfigModule,
    DatabaseTypeORMMongoDBConfigModule,
    UsersModule,
    AppConfigModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
