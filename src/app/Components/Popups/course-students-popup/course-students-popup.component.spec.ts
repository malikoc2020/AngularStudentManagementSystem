import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudentsPopupComponent } from './course-students-popup.component';

describe('CourseStudentsPopupComponent', () => {
  let component: CourseStudentsPopupComponent;
  let fixture: ComponentFixture<CourseStudentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseStudentsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStudentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
