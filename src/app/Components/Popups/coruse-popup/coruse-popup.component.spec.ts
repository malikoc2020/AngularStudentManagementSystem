import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorusePopupComponent } from './coruse-popup.component';

describe('CorusePopupComponent', () => {
  let component: CorusePopupComponent;
  let fixture: ComponentFixture<CorusePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorusePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorusePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
