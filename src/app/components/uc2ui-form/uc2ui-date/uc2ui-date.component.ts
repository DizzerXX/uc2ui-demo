import { Component, EventEmitter, Input, Output, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DateProperties } from '../uc2ui-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'uc2ui-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uc2ui-date.component.html',
  styleUrls: ['./uc2ui-date.component.scss']
})
export class Uc2uiDateComponent {
  selectedDateTime: string = '';

  @ViewChild('dateTimeInput') dateTimeInput!: ElementRef;
  @Input() dateProperties: DateProperties = {
    date: new Date(),
    dateFormat: 'yyyy-MM-dd',
    displayTime: false,
    timeFormat: '24',
  }

  // Method to open hidden datetime-local input
  openDateTimePicker() {
    console.log("test", this.dateTimeInput.nativeElement)
    this.dateTimeInput.nativeElement.click();
  }

  // Method to handle date change
  onDateTimeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDateTime = input.value;
  }
}
