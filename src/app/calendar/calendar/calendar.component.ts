import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import moment from 'moment';
import { MatCalendar } from '@angular/material/datepicker';
export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
}

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
  hours: Date[] = [];
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('calendar') calendar!: MatCalendar<Date>; // Reference to the calendar
  appointments: any[] = []; // Store all appointments
  
  constructor(private fb: FormBuilder,private storageService: StorageService,public cdr: ChangeDetectorRef
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
      this.cdr.detectChanges();
      console.log('Form Submitted and Data Saved:', appointmentData);


      

      console.log('Form Submitted:', this.appointmentForm.value);
      this.storageService.setData('appointment', this.appointmentForm.value);
      // Close the modal
      this.exampleModal.nativeElement.click();

      //  this.cdr.detectChanges();

      // Reset the form after submission
      this.appointmentForm.reset();
      // Force calendar to refresh
      this.loadAllAppointments(); // Reload appointments
      this.cdr.detectChanges();

      // Manually update the calendar view
      if (this.calendar) {
        this.calendar.updateTodaysDate(); // Assuming the calendar component has this method
      }
    } else {
      this.appointmentForm.markAllAsTouched();
    }
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


  events: TimelineEvent[] = [
    { time: '9:00 AM', title: 'Event 1', description: 'Description for event 1' },
    { time: '11:30 AM', title: 'Event 2', description: 'Description for event 2' },
    { time: '2:00 PM', title: 'Event 3', description: 'Description for event 3' },
    { time: '2:00 PM', title: 'Event 3', description: 'Description for event 3' },
    { time: '2:00 PM', title: 'Event 3', description: 'Description for event 3' },
    { time: '2:00 PM', title: 'Event 3', description: 'Description for event 3' },
    // Add more events here
  ];

  
}
