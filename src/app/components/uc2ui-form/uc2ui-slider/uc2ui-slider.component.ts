import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'uc2ui-slider',
  standalone: true,
  imports: [],
  templateUrl: './uc2ui-slider.component.html',
  styleUrl: './uc2ui-slider.component.scss'
})
export class Uc2uiSliderComponent {
  @Input() min: any = 0;
  @Input() max: any = 100;
  @Input() value: any = 50; // Default value set to 50 (middle)
  @Output() valueChange = new EventEmitter<number>();

  ngOnInit(): void {
    // Ensure the initial value is in the middle
    this.value = (this.min + this.max) / 2;
  }

  // Update the value in real-time while sliding
  onSliderInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = +inputElement.value;
  }

  // Emit the value only when the slider stops sliding
  onSliderChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(+inputElement.value);
  }

  // Calculate the thumb position percentage
  getThumbPosition(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }
}
