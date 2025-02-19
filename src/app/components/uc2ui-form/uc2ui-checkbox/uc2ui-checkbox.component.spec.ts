import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiCheckboxComponent } from './uc2ui-checkbox.component';

describe('Uc2uiCheckboxComponent', () => {
  let component: Uc2uiCheckboxComponent;
  let fixture: ComponentFixture<Uc2uiCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
