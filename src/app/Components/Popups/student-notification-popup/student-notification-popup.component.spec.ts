import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotificationPopupComponent } from './student-notification-popup.component';

describe('StudentNotificationPopupComponent', () => {
  let component: StudentNotificationPopupComponent;
  let fixture: ComponentFixture<StudentNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNotificationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
