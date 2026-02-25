import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormComponent } from '../../components/task-form/task-form';
import { TaskListComponent } from '../../components/task-list/task-list';

import { TaskService } from '../../services/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskListComponent
  ],
  templateUrl: './home.html'
})
export class Home {

  constructor(public taskService: TaskService) {}

  // ✅ toplam task
  get totalTasks(): number {
    return this.taskService.tasks.length;
  }

  // ✅ completed task
  get completedTasks(): number {
    return this.taskService.tasks.filter(task => task.completed).length;
  }

  // ✅ pending task
  get pendingTasks(): number {
    return this.taskService.tasks.filter(task => !task.completed).length;
  }

}