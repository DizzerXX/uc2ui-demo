import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { navMenu, NavMenuComponent } from './components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'uc2ui-demo';

  panelMenu: navMenu = {
    iconPosition: 'right',
    arrowPosition: 'left',
    theme: 'primary',
    multiple: false,
    children: [
      {
        label: 'Accordion',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/accordion' // Add a link property
      },
      {
        label: 'Breadcrumbs',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/breadcrumbs' // Add a link property
      },
      {
        label: 'Dialog',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/dialog' // Add a link property
      },
      {
        label: 'Nav Menu',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/nav-menu' // Add a link property
      },
      {
        label: 'File Previewer',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/previewer' // Add a link property
      },
      {
        label: 'Search Bar',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/search-bar' // Add a link property
      },
      {
        label: 'Spinner',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/spinner' // Add a link property
      },
      {
        label: 'Table',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/table' // Add a link property
      },
      {
        label: 'Toast',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [],
        routerLink: '/toast' // Add a link property
      },
      {
        label: 'Form',
        icon: 'uc2icons-folderMedia',
        expanded: false,
        children: [
          {
            label: 'Checkbox',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/checkbox' // Add a link property
          },
          {
            label: 'Color',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/color' // Add a link property
          },
          {
            label: 'Date',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/date' // Add a link property
          },
          {
            label: 'Dropdown',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/dropdown' // Add a link property
          },
          {
            label: 'File',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/file' // Add a link property
          },
          {
            label: 'Radio',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/radio' // Add a link property
          },
          {
            label: 'Slider',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/slider' // Add a link property
          },
          {
            label: 'Switch',
            icon: 'uc2icons-folderMedia',
            expanded: false,
            children: [],
            routerLink: '/switch' // Add a link property
          },
        ],
        routerLink: '/form' // Add a link property
      },
    ]
  };
}
