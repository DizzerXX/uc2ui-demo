import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiRadioComponent } from './uc2ui-radio.component';

describe('Uc2uiRadioComponent', () => {
  let component: Uc2uiRadioComponent;
  let fixture: ComponentFixture<Uc2uiRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
