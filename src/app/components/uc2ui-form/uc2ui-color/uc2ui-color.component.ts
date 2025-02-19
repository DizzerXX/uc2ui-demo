import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'uc2ui-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uc2ui-color.component.html',
  styleUrl: './uc2ui-color.component.scss'
})
export class Uc2uiColorComponent {
  constructor(private elementRef: ElementRef) {}
  @Input() options?: Array<{ label: string, value: any }> = [];
  @Input() placeholder: string = 'Select a color';
  @Input() selectedColor: any = null; // Can be string or array for multiple
  multiple: boolean = false; // Indicates whether multiple selections are allowed
  colorOpen: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();  // Emit event for two-way binding

  toggleSelect() {
    this.colorOpen = !this.colorOpen;
  }

  selectItem(option: { label: string, value: any }) {
    if (this.multiple) {
      if (!Array.isArray(this.selectedColor)) {
        this.selectedColor = [];
      }
      // Toggle selection
      const index = this.selectedColor.indexOf(option.value);
      if (index === -1) {
        this.selectedColor.push(option.value); // Add to selection
      } else {
        this.selectedColor.splice(index, 1); // Remove from selection
      }
    } else {
      this.selectedColor = option.value; // Single selection
      this.colorOpen = false; // Close the dropdown for single-select
    }

    this.valueChange.emit(this.selectedColor);  // Emit the updated value
  }

  isSelected(option: { label: string, value: any }) {
    if (this.multiple) {
      return Array.isArray(this.selectedColor) && this.selectedColor.includes(option.value);
    } else {
      return this.selectedColor === option.value;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.colorOpen = false;
    }
  }
}
