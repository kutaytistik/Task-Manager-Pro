import {
  Component,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';

import { TaskService } from '../../services/task';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements AfterViewInit {

  private chart: Chart | null = null;

  constructor(public taskService: TaskService) {}

  // TOTAL TASKS
  get totalTasks(): number {

    return this.taskService.tasks.length;

  }

  // COMPLETED TASKS
  get completedTasks(): number {

    return this.taskService.tasks.filter(
      t => t.completed
    ).length;

  }

  // PENDING TASKS
  get pendingTasks(): number {

    return this.taskService.tasks.filter(
      t => !t.completed
    ).length;

  }

  // COMPLETION RATE
  get completionRate(): number {

    if (this.totalTasks === 0) return 0;

    return Math.round(
      (this.completedTasks / this.totalTasks) * 100
    );

  }

  // RECENT TASKS
  get recentTasks(): Task[] {

    return this.taskService.tasks
      .slice(-5)
      .reverse();

  }

  // PRIORITY STATS
  get highPriority(): number {

    return this.taskService.tasks.filter(
      t => t.priority === 'High'
    ).length;

  }

  get mediumPriority(): number {

    return this.taskService.tasks.filter(
      t => t.priority === 'Medium'
    ).length;

  }

  get lowPriority(): number {

    return this.taskService.tasks.filter(
      t => t.priority === 'Low'
    ).length;

  }

  // UPCOMING DEADLINES
  get upcomingDeadlines(): Task[] {

    const today = new Date();

    return this.taskService.tasks
      .filter(task => task.deadline)
      .map(task => ({
        ...task,
        deadlineDate: new Date(task.deadline!)
      }))
      .filter(task =>
        task.deadlineDate >= today
      )
      .sort((a, b) =>
        taskDate(a).getTime() -
        taskDate(b).getTime()
      )
      .slice(0, 5);

    function taskDate(task: any) {
      return new Date(task.deadline);
    }

  }

  // CHART INITIALIZATION
  ngAfterViewInit(): void {

    this.createChart();

  }

  // CREATE CHART
  createChart(): void {

    const canvas =
      document.getElementById(
        'taskChart'
      ) as HTMLCanvasElement;

    if (!canvas) return;

    // destroy old chart if exists
    if (this.chart) {

      this.chart.destroy();

    }

    this.chart = new Chart(canvas, {

      type: 'pie',

      data: {

        labels: [
          'Completed',
          'Pending'
        ],

        datasets: [

          {
            data: [
              this.completedTasks,
              this.pendingTasks
            ],

            backgroundColor: [
              '#198754',
              '#ffc107'
            ],

            borderWidth: 1

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            position: 'bottom'

          }

        }

      }

    });

  }

}