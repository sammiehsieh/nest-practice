import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/task/task.service';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
