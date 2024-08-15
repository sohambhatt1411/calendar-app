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
import {MatIconModule} from '@angular/material/icon';
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
    ReactiveFormsModule,MatIconModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})


export class CalendarComponent {
  selectedDate: Date | null = null;
  appointmentForm!: FormGroup;
  hours: Date[] = [];
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('openModel') openModel!: ElementRef;
  @ViewChild('calendar') calendar!: MatCalendar<Date>; // Reference to the calendar
  appointments: any[] = []; // Store all appointments
  events:any;
  currentEvent: any;
  isEditing = false;

  tempselectdata:any;
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
    const formValue = this.appointmentForm.value;

    if (this.isEditing && this.currentEvent) {
      // Update the existing appointment
      const updatedEvent = {
        ...this.currentEvent, // retain the ID and original event data
        ...formValue // update the changed fields
      };

      const index = this.appointments.findIndex(app => app.id === this.currentEvent.id);
      if (index !== -1) {
        this.appointments[index] = updatedEvent;
        this.storageService.setAppointments(this.appointments);
        this.onDateSelected(this.selectedDate); // Refresh the events list
      }
    } else {
      // Add new appointment with a unique ID (using Date.now() as a unique identifier)
      const newEvent = {
        id: Date.now(), // unique identifier for the new event
        ...formValue
      };
      this.appointments.push(newEvent);
      this.storageService.setAppointments(this.appointments);
      this.onDateSelected(this.selectedDate); // Refresh the events list
    }

    // Close the modal
    this.exampleModal.nativeElement.click();

    // Reset the form after submission
    this.appointmentForm.reset();
    this.loadAllAppointments(); // Reload appointments
    this.cdr.detectChanges();

    // Manually update the calendar view
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }

    if(this.isEditing){
      this.events= this.appointments.filter(appointment => 
        moment(appointment.date).format('YYYY-MM-DD') === this.tempselectdata
      );
    }
    

    // Reset editing state
    this.isEditing = false;
    this.currentEvent = null;

  
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

  onDateSelected(date:any){
   
    const dateStr = moment(date).format('YYYY-MM-DD');
    this.tempselectdata = dateStr;
    const hasAppointment = this.appointments.some(appointment => 
      moment(appointment.date).format('YYYY-MM-DD') === dateStr
    );
    console.log(hasAppointment);
    if(hasAppointment){
      this.events= this.appointments.filter(appointment => 
        moment(appointment.date).format('YYYY-MM-DD') === dateStr
      );
    }
  }

  editEvent(event: any) {
    // Implement the edit functionality here
    // Open a dialog or navigate to an edit page
    console.log('Edit event:', event);
    // Example: this.dialog.open(EditEventDialogComponent, { data: event });
   
      // Prefill the form with the event data
      this.appointmentForm.patchValue({
        title: event.title,
        description: event.description,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
      });    
      this.isEditing = true;
      this.currentEvent = event;
      this.openModel.nativeElement.click();
   
  }

  openModal(event?: any) {
    if (event) {
      // Edit mode
      this.isEditing = true;
      this.currentEvent = event;
      this.appointmentForm.patchValue({
        title: event.title,
        description: event.description,
        date: moment(event.date).format('YYYY-MM-DD'),
        startTime: event.startTime,
        endTime: event.endTime
      });
    } else {
      // Add mode
      this.isEditing = false;
      this.currentEvent = null;
      this.appointmentForm.reset();
    }
  }
  deleteEvent(event: any) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this event?')) {
      this.appointments = this.appointments.filter(app => app !== event);
      this.storageService.setAppointments(this.appointments);
      this.onDateSelected(this.selectedDate); // Refresh the events list
    }
  }
   
}
