import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Type } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'uc2ui-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('3000ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
      ]),
    ]),
  ],

})
export class DialogComponent implements OnInit, OnChanges {
  @Input() data!: dialogParam;
  @Output() dialogClose = new EventEmitter<any>(); // Notify parent about dialog closure.
  @Output() dialogConfirm = new EventEmitter<any>(); // Notify parent about dialog closure.

  animationState = 'open';

  ngOnChanges(): void {
    // Handle any input changes if necessary
  }

  ngOnInit(): void {
    console.log('DialogComponent initialized with data:', this.data);

    // Disable scrolling when dialog is open
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    // document.body.classList.add('dialog-open'); // Disable scrolling when dialog is open
  }

  closeDialog(result: any = null): void {
    this.animationState = 'closing'; // Trigger closing animation
    setTimeout(() => {
      this.animationState = 'closed'; // Remove from DOM after animation ends
      this.dialogClose.emit(result); // Emit result after the dialog is closed

      document.body.style.overflow = '';
      document.body.style.height = '';
      // document.body.classList.remove('dialog-open'); // Enable scrolling
    }, 200); // Delay matches animation duration
  }

  closeDialogConfirm(result: any = null): void {
    this.animationState = 'closing'; // Trigger closing animation
    setTimeout(() => {
      this.animationState = 'closed'; // Remove from DOM after animation ends
      this.dialogConfirm.emit(result); // Emit result after the dialog is closed

      document.body.style.overflow = '';
      document.body.style.height = '';
      // document.body.classList.remove('dialog-open'); // Enable scrolling
    }, 200); // Delay matches animation duration
  }


  // Check if the content is a component class (Type<any>) or plain string
  isComponent(content: any): content is Type<any> {
    return typeof content === 'function' || typeof content === 'object';
  }
}

export interface dialogParam {
  type: 'alert' | 'confirm' | 'custom'; // Type of dialog
  title: string; // Dialog title
  content: any; // Component or string content
  data?: any; // Optional additional data for the dialog
}
