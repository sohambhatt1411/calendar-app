import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
interface Appointment {
  title: string;
  date: Date;
}
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, DragDropModule, MatInputModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  days: { date: Date, appointments: Appointment[] }[] = [];
  appointmentForm: FormGroup;
  currentMonth: Date = new Date();

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCalendarData();
  }

  loadCalendarData() {
    // Initialize calendar days with sample data
    this.days = this.generateMonthDays(this.currentMonth);
  }

  generateMonthDays(month: Date) {
    const days: { date: Date, appointments: Appointment[] }[] = [];
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push({ date: new Date(date), appointments: [] });
    }

    return days;
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      const { title, date } = this.appointmentForm.value;
      const appointmentDate = new Date(date);
      const day = this.days.find(d => formatDate(d.date, 'yyyy-MM-dd', 'en-US') === formatDate(appointmentDate, 'yyyy-MM-dd', 'en-US'));

      if (day) {
        day.appointments.push({ title, date: appointmentDate });
        this.appointmentForm.reset();
      }
    }
  }

  deleteAppointment(day: any, appointment: Appointment) {
    day.appointments = day.appointments.filter((a: Appointment) => a !== appointment);
  }

  onDragDrop(event: CdkDragDrop<any, any>) {
    // Handle drag-and-drop to move appointments
    const previousIndex = this.days.findIndex(day => day.appointments.includes(event.item.data));
    const currentIndex = this.days.findIndex(day => day.date.toDateString() === event.container.data.date.toDateString());

    if (previousIndex !== currentIndex) {
      const appointment = event.item.data;
      this.days[previousIndex].appointments = this.days[previousIndex].appointments.filter(a => a !== appointment);
      this.days[currentIndex].appointments.push(appointment);
    }
  }
}
