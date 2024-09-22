import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { KonvaimgComponent } from './konvaimg/konvaimg.component';

const routes: Routes = [
   {
        path: 'calender',
        component:CalendarComponent
    },
    {
    path:'',
    component:KonvaimgComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
