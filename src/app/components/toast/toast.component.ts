import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  position: 'top-right' | 'bottom-right' | 'bottom-center' | 'top-center';
  hide?: boolean;
}

@Component({
  selector: 'uc2ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  public toasts: Toast[] = [];
  private toastIdCounter = 0;

  // List of possible positions for the toasts
  public positions: Array<'top-right' | 'bottom-right' | 'bottom-center' | 'top-center'> = ['top-right', 'bottom-right', 'bottom-center', 'top-center'];


  // Method to display the toast
  showToastMessage(toast: { title: string; message: string; type: 'success' | 'error' | 'info' | 'warning', position: 'top-right' | 'bottom-right' | 'bottom-center' | 'top-center' }) {
    const newToast: Toast = { ...toast, id: this.toastIdCounter++ };
    this.toasts.push(newToast);

    // Hide the toast automatically after 3 seconds with transition

    if(toast.type == 'error'){
      setTimeout(() => {
        this.triggerHideToast(newToast.id);
      }, 5000);
    } else if(toast.type == 'success'){
      setTimeout(() => {
        this.triggerHideToast(newToast.id);
      }, 3000);
    } else if(toast.type == 'info'){
      setTimeout(() => {
        this.triggerHideToast(newToast.id);
      }, 3000);
    } else if(toast.type == 'warning'){
      setTimeout(() => {
        this.triggerHideToast(newToast.id);
      }, 4000);
    } else{
      setTimeout(() => {
        this.triggerHideToast(newToast.id);
      }, 3000);
    }
  }

  // Method to trigger the hide animation
  triggerHideToast(id: number) {
    const toast = this.toasts.find(toast => toast.id === id);
    if (toast) {
      toast.hide = true;

      // Remove the toast after the transition (0.5s delay for smooth disappearance)
      setTimeout(() => {
        this.removeToast(id);
      }, 500);
    }
  }

  // Method to remove a toast by id
  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  // Method to filter toasts by position
  filterToastsByPosition(position: string) {
    return this.toasts.filter(toast => toast.position === position);
  }
}







