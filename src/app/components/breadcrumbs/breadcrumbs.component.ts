import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService, Breadcrumb } from './breadcrumbs.service';

@Component({
  selector: 'uc2ui-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'], // Fixed from styleUrl
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];  // Array to store breadcrumbs

  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit() {
    // Subscribe to the breadcrumbs observable from the service
    this.breadcrumbsService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;  // Update the breadcrumbs array
      console.log('Breadcrumbs updated:', this.breadcrumbs);
    });
  }


}
