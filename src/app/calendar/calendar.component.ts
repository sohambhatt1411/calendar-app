import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CdkDropListGroup, CdkDropList, CdkDrag, CdkDragDrop, CdkDropListEnterPredicate } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
