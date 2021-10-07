import { Inject } from '@nestjs/common';
import { LoggerService } from '../service/logger.service';
import { LoggerDto } from '../dtos/logger.dto';

const _generateDescriptor = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  injectService = null,
): PropertyDescriptor => {
  if (injectService) injectService(target, 'loggerService');
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${target.constructor.name}.${propertyKey}`,
      data: args.toString(),
    };
    try {
      this.loggerService.traceBegin(log);
      if (args.length > 0) this.loggerService.traceFilter(log);
      const result = originalMethod.apply(this, args);
      // Check if method is asynchronous
      if (result && result instanceof Promise) {
        // Return promise
        this.loggerService.traceEnd(log);
        return result.catch((error: any) => {
          log.error = error.stack;
          this.loggerService.traceError(log);
          throw error;
        });
      }

      // Return actual result
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error.stack;
      this.loggerService.traceError(log);
      throw error;
    }
  };

  return descriptor;
};

export function Log() {
  const injectService = Inject(LoggerService);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Method decorator
    if (descriptor) {
      return _generateDescriptor(
        target,
        propertyKey,
        descriptor,
        injectService,
      );
    } else {
      // Iterate over class properties except constructor
      // Need to be check
      for (const propertyName of Reflect.ownKeys(target.prototype).filter(
        (prop) => prop !== 'constructor',
      )) {
        const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(
          target.prototype,
          propertyName,
        )!;
        const isMethod = desc.value instanceof Function;
        if (!isMethod) continue;
        injectService(target, 'loggerService');
        Object.defineProperty(
          target.prototype,
          propertyName,
          _generateDescriptor(target, propertyName.toString(), desc),
        );
      }
    }
  };
}
