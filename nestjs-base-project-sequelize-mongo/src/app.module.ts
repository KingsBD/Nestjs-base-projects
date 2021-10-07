import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseMySqlConfigModule } from './config/database/mysql/config.module';
import { DatabaseMongoDBConfigModule } from './config/database/mongodb/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseMySqlConfigModule,
    DatabaseMongoDBConfigModule,
    UsersModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
