import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavMenuItemComponent } from './nav-menu-item/nav-menu-item.component';

@Component({
  selector: 'uc2ui-nav-menu',
  standalone: true,
  imports: [CommonModule, NavMenuItemComponent],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})

export class NavMenuComponent implements OnInit {
  @Input() panelMenu!: navMenu

  ngOnInit(): void {
    console.log(this.panelMenu);
  }
}

export interface navMenu {
  iconPosition: 'left' | 'right';
  arrowPosition: 'left' | 'right';
  theme: 'primary' | 'secondary';
  multiple: boolean;
  children: navChild[];
}

export interface navChild {
  label: string;
  icon: string;
  expanded: boolean;
  children: navChild[];
  routerLink?: string; // Optional link property
}
