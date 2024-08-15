import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentdialogComponent } from './appointmentdialog.component';

describe('AppointmentdialogComponent', () => {
  let component: AppointmentdialogComponent;
  let fixture: ComponentFixture<AppointmentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
