import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiSliderComponent } from './uc2ui-slider.component';

describe('Uc2uiSliderComponent', () => {
  let component: Uc2uiSliderComponent;
  let fixture: ComponentFixture<Uc2uiSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
