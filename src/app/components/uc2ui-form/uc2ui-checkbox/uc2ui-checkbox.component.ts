import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uc2ui-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uc2ui-checkbox.component.html',
  styleUrls: ['./uc2ui-checkbox.component.scss']
})
export class Uc2uiCheckboxComponent {

  @Input() options?: Array<{ label: string, value: any }> = [];
  @Input() selectedCheck: any = null;
  @Input() multiple?: boolean = false; // Ensure the default is false if undefined
  @Input() inline?: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();  // Emit event for two-way binding

  toggleCheck(value: any) {
    if (this.multiple) {
      // Multiple selection logic
      if (!Array.isArray(this.selectedCheck)) {
        this.selectedCheck = [];
      }
      const index = this.selectedCheck.indexOf(value);
      if (index > -1) {
        this.selectedCheck.splice(index, 1); // Uncheck
      } else {
        this.selectedCheck.push(value); // Check
      }
    } else {
      // Single selection logic
      this.selectedCheck = this.selectedCheck === value ? null : value;
    }

    this.valueChange.emit( this.selectedCheck);  // Emit the updated value
  }

  isChecked(value: any): boolean {
    return this.multiple ? this.selectedCheck.includes(value) : this.selectedCheck === value;
  }
}

