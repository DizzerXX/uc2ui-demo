import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'uc2ui-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Default size is medium
  @Input() color: string = '#007bff'; // Default color is blue
  @Input() isLoading: boolean = false; // Controls the spinner visibility

  get spinnerClass(): string {
    return `${this.size}`; // Applies size class dynamically
  }

  get spinnerStyle(): { [key: string]: string } {
    return {
      '--spinner-color': this.color
    };
  }
}

