import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiSwitchComponent } from './uc2ui-switch.component';

describe('Uc2uiSwitchComponent', () => {
  let component: Uc2uiSwitchComponent;
  let fixture: ComponentFixture<Uc2uiSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
