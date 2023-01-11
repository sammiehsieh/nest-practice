import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'title 必填',
  })
  title: string;

  @IsOptional()
  description: string;
}
