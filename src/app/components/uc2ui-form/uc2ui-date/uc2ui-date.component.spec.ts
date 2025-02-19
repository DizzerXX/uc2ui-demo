import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiDateComponent } from './uc2ui-date.component';

describe('Uc2uiDateComponent', () => {
  let component: Uc2uiDateComponent;
  let fixture: ComponentFixture<Uc2uiDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
