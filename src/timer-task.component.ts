import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'timer-task',
  templateUrl: './timer-task.component.html',
  styleUrls: ['./timer-task.component.css'],
  providers: [TaskService]
})
export class TimerTaskComponent implements OnInit {

  newTask: Task = new Task();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  addTask() {
    this.taskService.addTask(this.newTask);
    this.newTask = new Task();
  }

  removeTask(task) {
    this.taskService.deleteTaskById(task.id);
  }

  get tasks() {
    return this.taskService.getAllTasks();
  }

 toggleTaskTimer(task) {
   this.taskService.toggleTaskTimer(task);
 }

 refreshTimer(task) {
   this.taskService.refreshTimer(task);
 }

}
