import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseMySqlConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mySql.host', 'localhost');
  }

  get port(): number {
    return this.configService.get<number>('mySql.port', 3306);
  }

  get username(): string {
    return this.configService.get<string>('mySql.username', 'root');
  }

  get password(): string {
    return this.configService.get<string>('mySql.password');
  }

  get database(): string {
    return this.configService.get<string>('mySql.database', 'test');
  }
}
