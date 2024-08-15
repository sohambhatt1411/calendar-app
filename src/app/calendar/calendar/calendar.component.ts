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
  }
}
