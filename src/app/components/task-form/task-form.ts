import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {
  title = '';
  description = '';
  priority: 'Low' | 'Medium' | 'High' = 'Low';
  category: 'Work' | 'Personal' | 'School' | 'Health' | 'Shopping' | 'Other' = 'Other';
  deadline = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (!this.title.trim()) {
      alert('Task title required');
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      completed: false,
      priority: this.priority,
      category: this.category,
      createdAt: new Date(),
      deadline: this.deadline || undefined
    };

    this.taskService.addTask(task);
    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'Low';
    this.category = 'Other';
    this.deadline = '';
  }

  addBulletPoint(): void {
    this.description = this.description ? this.description + '\n• ' : '• ';
  }
}