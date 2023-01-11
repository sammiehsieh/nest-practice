import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './../dtos/create-task.dto';
import { UpdateTaskDto } from './../dtos/update-task.dto';
import { TaskNotFoundException } from '../filters/task-not-found.exception';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Injectable()
export class TaskService {
  task: Task[] = [];

  findTask(status?: TaskStatus, search?): Task[] {
    return this.task.filter((el) => {
      const statusCond = status ? el.status === status : true;
      const titleCond = search.title ? el.title === search.title : true;
      const descriptionCond = search.description
        ? el.description === search.description
        : true;
      return statusCond && (titleCond || descriptionCond);
    });
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    if (this.task.some((el) => el.title === createTaskDto.title)) {
      throw new TaskNotFoundException();
    }
    this.task.push({
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    });
    return this.task.find((el) => el.title === title);
  }

  updateTask(uuid: string, updateTaskDto: UpdateTaskDto): Task {
    const mytask = this.task.find((el) => el.id === uuid);
    if (!mytask) {
      throw new TaskNotFoundException();
    }
    if (updateTaskDto.title) {
      mytask.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      mytask.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      mytask.status = updateTaskDto.status;
    }
    return mytask;
  }

  updateTaskStatus(uuid: string, status: TaskStatus): Task {
    const mytask = this.task.find((el) => el.id === uuid);
    if (!mytask) {
      throw new TaskNotFoundException();
    }
    if (!status) {
      throw new HttpException('Status is required.', HttpStatus.BAD_REQUEST);
    }
    mytask.status = status;
    return mytask;
  }

  deleteTask(uuid: string) {
    if (!this.task.some((el) => el.id === uuid)) {
      throw new TaskNotFoundException();
    }
    this.task = this.task.filter((el) => el.id !== uuid);
  }
}
