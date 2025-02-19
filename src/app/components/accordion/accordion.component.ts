import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'uc2ui-accordion',
  standalone: true,
  imports: [CommonModule, AccordionItemComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  @Input() accordionParam!: accordionParam

  toggleItem(index: number) {
    const isMultiple = this.accordionParam.multiple;

    this.accordionParam.data = this.accordionParam.data.map((item, i) => {
      if (i === index) {
        return { ...item, isActive: !item.isActive };
      }
      return isMultiple ? item : { ...item, isActive: false };
    });
  }
}

export interface accordionParam{
  multiple: boolean,
  data: accordionBody[]
}

export interface accordionBody{
  header: string,
  isActive: boolean,
  body: string
}
