import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnasayfaComponent } from './student-anasayfa.component';

describe('StudentAnasayfaComponent', () => {
  let component: StudentAnasayfaComponent;
  let fixture: ComponentFixture<StudentAnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAnasayfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
