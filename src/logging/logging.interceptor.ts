import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service'; // Your service to save to DB

const SENSITIVE_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/new-password',
  '/auth/change-password',
  '/auth/reset-password',
];

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

        if (method === 'POST' && !SENSITIVE_ENDPOINTS.includes(url)) {
          await this.loggingService.log({
            userId: user?.id || null,
            method,
            endpoint: url,
            body,
            statusCode,
            latency,
          });
        }
      }),
    );
  }
}
