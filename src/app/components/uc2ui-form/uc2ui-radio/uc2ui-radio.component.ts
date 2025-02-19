import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uc2ui-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uc2ui-radio.component.html',
  styleUrl: './uc2ui-radio.component.scss'
})
export class Uc2uiRadioComponent {

  @Input() options?: Array<{ label: string, value: any }> = [];
  @Input() selectedRadio: any = null;
  multiple: boolean = false; // Ensure the default is false if undefined
  @Input() inline?: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();  // Emit event for two-way binding

  toggleRadio(value: any) {
    if (this.multiple) {
      // Multiple selection logic
      if (!Array.isArray(this.selectedRadio)) {
        this.selectedRadio = [];
      }
      const index = this.selectedRadio.indexOf(value);
      if (index > -1) {
        this.selectedRadio.splice(index, 1); // UnRadio
      } else {
        this.selectedRadio.push(value); // Radio
      }
    } else {
      // Single selection logic
      this.selectedRadio = this.selectedRadio === value ? null : value;
    }

    this.valueChange.emit( this.selectedRadio);  // Emit the updated value
  }

  isChecked(value: any): boolean {
    return this.multiple ? this.selectedRadio.includes(value) : this.selectedRadio === value;
  }
}
