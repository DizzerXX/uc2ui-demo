import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uc2uiPreviewerComponent } from './uc2ui-previewer.component';

describe('Uc2uiPreviewerComponent', () => {
  let component: Uc2uiPreviewerComponent;
  let fixture: ComponentFixture<Uc2uiPreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uc2uiPreviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uc2uiPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
