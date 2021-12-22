import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseApplicationComponent } from './new-course-application.component';

describe('NewCourseApplicationComponent', () => {
  let component: NewCourseApplicationComponent;
  let fixture: ComponentFixture<NewCourseApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCourseApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
