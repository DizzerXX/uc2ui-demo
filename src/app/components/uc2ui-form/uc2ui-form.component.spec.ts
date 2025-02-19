import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiFormComponent } from './uc2ui-form.component';

describe('Uc2uiFormComponent', () => {
  let component: Uc2uiFormComponent;
  let fixture: ComponentFixture<Uc2uiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
