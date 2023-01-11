import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Ip,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { Task, TaskService, TaskStatus } from './task.service';
import { CreateTaskDto } from './../dtos/create-task.dto';
import { UpdateTaskDto } from './../dtos/update-task.dto';
import { StatusPipe } from './../pipes/status.pipe';
import { TaskNotFoundFilter } from './../filters/task-not-found.filter';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  getAllTask(
    @Req() request: Request,
    @Ip() ip: string,
    // @Query('status', new ParseEnumPipe(TaskStatus)) queryStatus
    @Query('status', StatusPipe) queryStatus,
    @Query() query,
  ): Task[] {
    const data = {
      title: query.title,
      description: query.description,
    };
    // console.log(request.path);
    // console.log(ip); // 等同於 request.ip
    return this.taskService.findTask(queryStatus, data);
  }

  @Post()
  @HttpCode(201)
  @UseFilters(TaskNotFoundFilter)
  postTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Task {
    // Postman Body 要用 urlencoded 或 row(json) 傳送
    // console.log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':uuid/content')
  @UseFilters(TaskNotFoundFilter)
  putTask(
    @Param('uuid') id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Task {
    // console.log(id);
    // console.log(updateTaskDto);
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Patch(':uuid/status')
  @UseFilters(TaskNotFoundFilter)
  patchTaskStatus(
    @Param('uuid') id: string,
    @Body('status') status: TaskStatus,
  ) {
    // console.log(id);
    // console.log(query.status);
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete(':uuid')
  @UseFilters(TaskNotFoundFilter)
  deleteTask(@Param('uuid') id: string) {
    this.taskService.deleteTask(id);
  }
}
