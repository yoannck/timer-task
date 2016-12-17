import {Injectable} from '@angular/core';
import {Task} from './task';
import { LocalStorageService } from 'angular-2-local-storage';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TaskService {

  // Automatic incrementing of id's
  lastId: number = 0;
  tasks: Task[] = [];
  timers: any = [];
  nameStorage: string = 'tasks';

  constructor(private localStorageService: LocalStorageService) {
  }

  saveLocalStorage(): TaskService{
    this.localStorageService.set(this.nameStorage, this.tasks);
    return this;
  }

  //  POST /tasks
  addTask(task: Task): TaskService {
    if (!task.id) {
      task.id = ++this.lastId;
    }
    this.tasks.push(task);
    this.saveLocalStorage();
    return this;
  }

  //  DELETE /tasks/:id
  deleteTaskById(id: number): TaskService {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveLocalStorage();
    return this;
  }

  //  PUT /tasks/:id
  updateTaskById(id: number, values: Object = {}): Task {
    let task = this.getTaskById(id);
    if (!task) {
      return null;
    }
    Object.assign(task, values);
    this.saveLocalStorage();
    return task;
  }

  // GET /tasks
  getAllTasks() {
    let datas = this.localStorageService.get(this.nameStorage);
    if (datas instanceof Array) {
      if (this.tasks.length === 0) {
        this.lastId = datas.length;
        for (let data of datas) {
          let task = new Task(data);
          this.tasks.push(task);
          (task.checked) ? this.startTimer(task) : null;
        }
        return this.tasks;
      }
    }
    return this.tasks;
  }

  //  GET /tasks/:id
  getTaskById(id: number): Task {
    return this.tasks.filter(task => task.id === id).pop();
  }

  toggleTaskTimer(task: Task): Task{
    let updatedTask = this.updateTaskById(task.id, {
      checked: !task.checked
    });
    (task.checked) ? this.startTimer(task) : this.stopTimer(task.id);
    return updatedTask;
  }

  refreshTimer(task: Task): Task{
    let updatedTask = this.updateTaskById(task.id, {
      total: task.total + task.time,
      time: 0,
      clock: '00:00:00'
    });
    return updatedTask;
  }

  startTimer(task: Task) {
    this.timers[task.id] = Observable.timer(0,1000).subscribe(() => {
      let time = task.time++;
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor(time % 3600 / 60);
      let seconds = time % 60;
      task.clock = '';
      task.clock += (hours < 10) ? `0${hours}:` : `${hours}:`;
      task.clock += (minutes < 10) ? `0${minutes}:` : `${minutes}:`
      task.clock += (seconds < 10) ? `0${seconds}` : `${seconds}`;
    });
  }

  stopTimer(id: number) {
    this.timers[id].unsubscribe();
  }

}
