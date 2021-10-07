import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './service/logger.service';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.DailyRotateFile({
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '15d',
          filename: `${__dirname}/../../logs/test-log-%DATE%.log`,
        }),
      ],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
