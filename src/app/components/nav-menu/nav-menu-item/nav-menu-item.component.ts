import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { navChild, navMenu } from '../nav-menu.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uc2ui-nav-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-menu-item.component.html',
  styleUrl: './nav-menu-item.component.scss'
})
export class NavMenuItemComponent implements OnInit, OnDestroy {
  @Input() item!: navChild;
  @Input() panelMenu!: navMenu;
  @Input() tierNumber = 1;

  private routeSubscription!: Subscription;
  public isActive: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to router changes to check the active route
    this.routeSubscription = this.router.events.subscribe(() => {
      this.checkActiveRoute();
    });

    this.checkActiveRoute(); // Initial check on load
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Function to toggle the expanded state
  toggleItem(item: navChild): void {
    if (!this.panelMenu.multiple) {
      this.closeAllSiblings();
    }
    item.expanded = !item.expanded;
  }

  private closeAllSiblings(): void {
    console.log("test", this.item)
    if(this.item){
      if(this.item.children && this.item.children.length > 0){
        this.item.children.forEach(child => {
          console.log(child)
          child.expanded = false;
        });
      } else{
        this.item.expanded == false
      }
    }
  }

  private checkActiveRoute(): void {
    // Check if the current route matches the routerLink of the item
    const currentRoute = this.router.url.split('?')[0]; // Remove query parameters
    this.isActive = currentRoute === this.item.routerLink;
  }
}
