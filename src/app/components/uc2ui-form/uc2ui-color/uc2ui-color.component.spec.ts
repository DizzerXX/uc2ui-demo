import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiColorComponent } from './uc2ui-color.component';

describe('Uc2uiColorComponent', () => {
  let component: Uc2uiColorComponent;
  let fixture: ComponentFixture<Uc2uiColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
