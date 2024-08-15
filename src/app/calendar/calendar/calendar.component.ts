import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import moment from 'moment'; // Import moment.js to handle date formatting
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  appointmentForm!: FormGroup;
  @ViewChild('exampleModal') exampleModal!: ElementRef;

  appointments: any[] = []; // Store all appointments
  constructor(private fb: FormBuilder, private storageService: StorageService
  ) {

    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
    this.loadAllAppointments(); // Load appointments when the component is initialized
  }

  // Load all appointments into the array
  loadAllAppointments(): void {
    this.appointments = this.storageService.getAppointments();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {

      const appointmentData = this.appointmentForm.value;

      // Add the new appointment to the array
      this.appointments.push(appointmentData);

      // Save the updated appointments array to localStorage
      this.storageService.setAppointments(this.appointments);

      console.log('Form Submitted and Data Saved:', appointmentData);

      console.log('Form Submitted:', this.appointmentForm.value);
      this.storageService.setData('appointment', this.appointmentForm.value);
      // Close the modal
      this.exampleModal.nativeElement.click();

      // Reset the form after submission
      this.appointmentForm.reset();
    } else {
      this.appointmentForm.markAllAsTouched();
    }
  }
  // Optionally, you can retrieve data when needed
  loadAppointment() {
    const savedAppointment = this.storageService.getData('appointment');

  }
  // Highlight dates with appointments using dateClass
  dateClass = (date: Date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    
    // Check if any appointment in the array has the current date
    const hasAppointment = this.appointments.some(appointment => 
      moment(appointment.date).format('YYYY-MM-DD') === dateStr
    );

    return hasAppointment ? 'has-appointment' : '';
  };
}
