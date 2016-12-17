import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { TimerTaskComponent } from './timer-task.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    TimerTaskComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    LocalStorageModule.withConfig({
      prefix: 'timer-task',
      storageType: 'localStorage'
    })
  ],
  exports: [TimerTaskComponent],
  providers: [TaskService],
  bootstrap: [TimerTaskComponent]
})
export class TimerTaskModule { }
