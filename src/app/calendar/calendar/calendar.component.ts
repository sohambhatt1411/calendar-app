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
import * as moment from 'moment'; // Import moment.js to handle date formatting
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
  constructor(private fb: FormBuilder,private storageService: StorageService
  ) {

    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
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
}
