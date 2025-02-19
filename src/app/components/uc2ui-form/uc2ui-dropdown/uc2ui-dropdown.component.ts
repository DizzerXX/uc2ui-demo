import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'uc2ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uc2ui-dropdown.component.html',
  styleUrls: ['./uc2ui-dropdown.component.scss']
})
export class Uc2uiDropdownComponent {
  @Input() options?: Array<{ label: string, value: any }> = [];
  @Input() placeholder: string = 'Select an option';
  @Input() multiple?: boolean = false;
  @Input() selectedDropdown: any = this.multiple ? [] : null;
  @Output() valueChange = new EventEmitter<any>();
  dropdownOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggleSelect() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(option: { label: string, value: any }, event: Event) {
    event.stopPropagation();

    if (this.multiple) {
      if (!Array.isArray(this.selectedDropdown)) {
        this.selectedDropdown = [];
      }

      const index = this.selectedDropdown.indexOf(option.value);
      if (index === -1) {
        this.selectedDropdown.push(option.value);
      } else {
        this.selectedDropdown.splice(index, 1);
      }
    } else {
      this.selectedDropdown = option.value;
      this.dropdownOpen = false; // Close dropdown for single-select
    }

    this.valueChange.emit(this.selectedDropdown);
  }

  isSelected(option: { label: string, value: any }): boolean {
    if (this.multiple) {
      return Array.isArray(this.selectedDropdown) && this.selectedDropdown.includes(option.value);
    } else {
      return this.selectedDropdown === option.value;
    }
  }

  displaySelected(): string | null {
    if (this.multiple && Array.isArray(this.selectedDropdown)) {
      const selectedLabels = this.selectedDropdown
        .map((value: any) => this.options?.find(option => option.value === value)?.label)
        .filter(label => label); // Remove undefined labels
      return selectedLabels.length ? selectedLabels.join(', ') : null;
    } else {
      const selectedOption = this.options?.find(option => option.value === this.selectedDropdown);
      return selectedOption ? selectedOption.label : null;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
