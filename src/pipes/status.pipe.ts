import { TaskStatus } from 'src/task/task.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StatusPipe implements PipeTransform {
  transform(value: any) {
    // if (TaskStatus[value]) {
    if (value && !Object.values(TaskStatus).includes(value)) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
