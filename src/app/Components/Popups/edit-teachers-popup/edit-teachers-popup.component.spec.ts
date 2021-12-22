import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachersPopupComponent } from './edit-teachers-popup.component';

describe('EditTeachersPopupComponent', () => {
  let component: EditTeachersPopupComponent;
  let fixture: ComponentFixture<EditTeachersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachersPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeachersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
