import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppointmentdialogComponent } from '../appointmentdialog/appointmentdialog.component';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentdialogComponent, {
      width: '400px',
      data: {
        date: this.selectedDate,
        title: '',
        description: '',
        startTime: '',
        endTime: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment saved:', result);
      }
    });
    // selectedTime: string;

    // constructor() {
    //   this.selectedTime = '12:00'; // Default time
    // }



    // hours: number[] = Array.from({ length: 24 }, (_, i) => i);
    // minutes: number[] = Array.from({ length: 60 }, (_, i) => i);
    // selectedHour: number = 12;
    // selectedMinute: number = 0;
    // timeChange: any;
    // ngOnChanges() {
    //   this.emitTime();
    // }
    // emitTime() {
    //   const time = `${this.pad(this.selectedHour)}:${this.pad(this.selectedMinute)}`;
    //   this.timeChange.emit(time);
    // }
    // pad(value: number): string {
    //   return value < 10 ? '0' + value : value.toString();
    // }

    onTimeChange(event: any): void {
      const selectedTime = event.value,
      console.log('Selected Time:', selectedTime);
    }
  }
}
