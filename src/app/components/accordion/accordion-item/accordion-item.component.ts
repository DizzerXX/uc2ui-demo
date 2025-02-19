import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { accordionBody } from '../accordion.component';

@Component({
  selector: 'uc2ui-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss'
})
export class AccordionItemComponent {
  @Input() accordionBody!: accordionBody


  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
