// src/app/breadcrumbs/breadcrumbs.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'  // Makes the service available globally
})
export class BreadcrumbsService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);  // Initialize with an empty array
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();  // Public observable for components to subscribe to

  constructor() {}

  // Method to update breadcrumbs
  updateBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbsSubject.next(breadcrumbs);  // Emit the new breadcrumbs
  }
}

// Define the Breadcrumb interface
export interface Breadcrumb {
  label: string;
  url: string;
}
