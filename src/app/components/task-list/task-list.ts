import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../interfaces/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  searchText: string = '';
  filter: string = 'all';
  categoryFilter: string = 'all';
  
  filteredTasks: Task[] = [];

  editingTask: Task | null = null;
  editedTask!: Task;
  showDeleteModal: boolean = false;
  taskIdToDelete: number | null = null;

  private sub = new Subscription();

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.sub = this.taskService.tasks$.subscribe(() => {
      this.refreshTasks();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  onSearchChange(): void { this.refreshTasks(); }
  onFilterChange(): void { this.refreshTasks(); }

  refreshTasks(): void {
    let tasks = [...this.taskService.tasks];


    if (this.searchText && this.searchText.trim() !== '') {
      const search = this.searchText.toLowerCase().trim();
      tasks = tasks.filter(t => 
        (t.title?.toLowerCase().includes(search)) ||
        (t.description?.toLowerCase().includes(search))
      );
    }


    if (this.filter === 'completed') {
      tasks = tasks.filter(t => t.completed);
    } else if (this.filter === 'pending') {
      tasks = tasks.filter(t => !t.completed);
    }


    if (this.categoryFilter !== 'all') {
      tasks = tasks.filter(t => t.category === this.categoryFilter);
    }

    this.filteredTasks = tasks;
  }


  confirmDelete(id: number): void {
    this.taskIdToDelete = id;
    this.showDeleteModal = true;
  }

  executeDelete(): void {
    if (this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showDeleteModal = false;
    this.taskIdToDelete = null;
  }


  toggleCompleted(task: Task): void {
    this.taskService.toggleTask(task.id);
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.editedTask = { ...task };
  }

  saveTask(): void {
    this.taskService.updateTask(this.editedTask);
    this.editingTask = null;
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
}