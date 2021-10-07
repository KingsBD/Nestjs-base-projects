import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseTypeORMMongoDBConfigService {
  constructor(private configService: ConfigService) {}

  get url(): string {
    return this.configService.get<string>(
      'type-orm-mongodb.url',
      'mongodb://127.0.0.1:27017',
    );
  }

  get database(): string {
    return this.configService.get<string>(
      'type-orm-mongodb.database',
      'mongodb_test',
    );
  }
}
