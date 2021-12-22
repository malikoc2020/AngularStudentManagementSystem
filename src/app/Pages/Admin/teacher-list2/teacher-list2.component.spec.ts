import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherList2Component } from './teacher-list2.component';

describe('TeacherList2Component', () => {
  let component: TeacherList2Component;
  let fixture: ComponentFixture<TeacherList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherList2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
