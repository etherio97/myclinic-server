import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service'; // Your service to save to DB

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(async () => {
        const latency = Date.now() - startTime;
        const statusCode = context.switchToHttp().getResponse().statusCode;

        await this.loggingService.log({
          userId: user?.id || null,
          method,
          endpoint: url,
          body: method !== 'GET' ? body : null,
          statusCode,
          latency,
        });
      }),
    );
  }
}
