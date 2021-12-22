import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAnasayfaComponent } from './teacher-anasayfa.component';

describe('TeacherAnasayfaComponent', () => {
  let component: TeacherAnasayfaComponent;
  let fixture: ComponentFixture<TeacherAnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAnasayfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
