import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiFileComponent } from './uc2ui-file.component';

describe('Uc2uiFileComponent', () => {
  let component: Uc2uiFileComponent;
  let fixture: ComponentFixture<Uc2uiFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
