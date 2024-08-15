import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,DragDropModule,
    MatButtonModule,ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  appointmentForm: FormGroup;
  appointments: any;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      appointmentDate: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const startDate = new Date(this.appointmentForm.get('startDate')?.value);
      const startTime = this.appointmentForm.get('startTime')?.value;
      const endTime = this.appointmentForm.get('endTime')?.value;
  
      startDate.setHours(Number(startTime.split(':')[0]), Number(startTime.split(':')[1]));
  
      const newAppointment = {
        title: this.appointmentForm.get('title')?.value,
        description: this.appointmentForm.get('description')?.value,
        startDate: startDate,
        endDate: new Date(startDate).setHours(Number(endTime.split(':')[0]), Number(endTime.split(':')[1])),
      };
  
      this.appointments.push(newAppointment);
      this.appointmentForm.reset();
    }
  }
  deleteAppointment(index: any): void {
    this.appointments.splice(index, 1);
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}
