import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiDropdownComponent } from './uc2ui-dropdown.component';

describe('Uc2uiDropdownComponent', () => {
  let component: Uc2uiDropdownComponent;
  let fixture: ComponentFixture<Uc2uiDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
