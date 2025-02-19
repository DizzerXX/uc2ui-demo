import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'uc2ui-switch',
  standalone: true,
  imports: [],
  templateUrl: './uc2ui-switch.component.html',
  styleUrls: ['./uc2ui-switch.component.scss'] // Corrected typo
})
export class Uc2uiSwitchComponent implements OnChanges {
  @Input() value: any = false;  // Initial input value
  @Output() valueChange = new EventEmitter<boolean>();  // Emit event for two-way binding

  // Detect changes to the input value
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
    }
  }

  // Toggle the switch and emit the updated value
  toggleSwitch() {
    this.value = !this.value;
    this.valueChange.emit(this.value);  // Emit the updated value
  }
}
