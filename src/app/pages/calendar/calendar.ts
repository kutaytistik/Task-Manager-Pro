import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskService } from '../../services/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class CalendarComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    height: 560,
    aspectRatio: 1.8, // Genişlik/Yükseklik oranını artırarak yana yayılmasını sağladık
    handleWindowResize: true,
    firstDay: 1,
    dayMaxEvents: 2,
    events: []
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscription = this.taskService.tasks$.subscribe(() => {
      this.refreshEvents();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshEvents(): void {
    const events = this.taskService.tasks
      .filter(t => t.deadline)
      .map(t => ({
        title: t.title,
        start: t.deadline,
        backgroundColor: this.getPriorityColor(t.priority),
        borderColor: 'transparent',
        textColor: '#ffffff'
      }));
    this.calendarOptions = { ...this.calendarOptions, events };
  }

  getPriorityColor(priority: string): string {
    const colors: any = { 'High': '#ef4444', 'Medium': '#f59e0b', 'Low': '#10b981' };
    return colors[priority] || '#6366f1';
  }
}