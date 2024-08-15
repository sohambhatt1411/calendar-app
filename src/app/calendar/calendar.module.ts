import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { CalendarRoutingModule } from './calendar-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CalendarRoutingModule,DragDropModule, MatInputModule ,NoopAnimationsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    provideNativeDateAdapter(),
  ],
})
export class CalendarModule { }
