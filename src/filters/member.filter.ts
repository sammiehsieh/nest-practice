import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'Express';

@Catch(HttpException)
export class MemberFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    // 400 Bad Request 前端發送請求的語法錯誤，後端無法理解
    // 403 Forbidden 後端理解前端的請求，但是拒絕執行此請求

    switch (message) {
      case 'MEMBER_EXIST':
        return response.json({
          code: message,
          message: ['Member is existed.'],
        });
      case 'MEMBER_NOT_FOUND':
        return response.json({
          code: message,
          message: ['Member not found.'],
        });

      default:
        return response.json({
          code: `S_${status}`,
          message: exception.getResponse()['message'],
        });
    }
  }
}
