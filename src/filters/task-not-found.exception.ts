import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('forbidden', HttpStatus.FORBIDDEN);
  }
}
