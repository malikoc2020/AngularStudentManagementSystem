import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnasayfaPopapComponent } from './anasayfa-popap.component';

describe('AnasayfaPopapComponent', () => {
  let component: AnasayfaPopapComponent;
  let fixture: ComponentFixture<AnasayfaPopapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnasayfaPopapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnasayfaPopapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
