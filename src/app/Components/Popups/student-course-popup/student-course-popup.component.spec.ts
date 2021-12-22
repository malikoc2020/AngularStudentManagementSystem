import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursePopupComponent } from './student-course-popup.component';

describe('StudentCoursePopupComponent', () => {
  let component: StudentCoursePopupComponent;
  let fixture: ComponentFixture<StudentCoursePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCoursePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
