import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Uc2uiDropdownComponent } from './uc2ui-dropdown/uc2ui-dropdown.component';
import { Uc2uiCheckboxComponent } from './uc2ui-checkbox/uc2ui-checkbox.component';
import { Uc2uiSwitchComponent } from './uc2ui-switch/uc2ui-switch.component';
import { Uc2uiColorComponent } from './uc2ui-color/uc2ui-color.component';
import { Uc2uiRadioComponent } from './uc2ui-radio/uc2ui-radio.component';
import { Uc2uiDateComponent } from './uc2ui-date/uc2ui-date.component';
import { Uc2uiSliderComponent } from './uc2ui-slider/uc2ui-slider.component';
import { Uc2uiFileComponent } from './uc2ui-file/uc2ui-file.component';

@Component({
  selector: 'uc2ui-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Uc2uiColorComponent,
    Uc2uiDropdownComponent,
    Uc2uiCheckboxComponent,
    Uc2uiSwitchComponent,
    Uc2uiRadioComponent,
    Uc2uiDateComponent,
    Uc2uiSliderComponent,
    Uc2uiFileComponent,
  ],
  templateUrl: './uc2ui-form.component.html',
  styleUrls: ['./uc2ui-form.component.scss'],
})
export class Uc2uiFormComponent implements OnInit {
  @Input() formData!: FormProperties;

  defaultFormData: FormProperties = this.getDefaultFormData();
  formModel: { [key: string]: any } = {}; // Form state
  formErrors: { [key: string]: boolean } = {}; // Validation errors

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeForm();
    this.populateFormModel();
    console.log(this.formModel); // Debugging
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.populateFormModel();
      this.cdr.detectChanges();
    });
  }

  private getDefaultFormData(): FormProperties {
    return {
      name: '',
      apiUrl: '',
      apiType: 'POST',
      formData: [
        {
          field: [
            {
              name: '',
              label: '',
              type: 'text',
              required: false,
              value: '',
              defaultValue: '',
              defaultValueSlider: 0,
              multiple: false,
              search: false,
              placeholder: '',
              pattern: '',
              minLength: 0,
              maxLength: 524288,
              min: 0,
              max: 100,
              step: 1,
              disabled: false,
              readOnly: false,
              autoFocus: false,
              options: [{ label: '', value: '' }],
              fileType:['JPG', 'PNG', 'GIF', 'PDF'],
              helpText: '',
              errorText: '',
              onChange: () => {}, // No-op function
              icon: '',
              inline: false,
              dateProperties: {
                date: new Date(),
                dateFormat: 'yyyy-MM-dd',
                displayTime: false,
                timeFormat: '24',
                minDate: new Date(),
                maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                disableDates: [],
                timezone: '+8',
              },
            },
          ],
        },
      ],
      buttons: [
        {
          name: 'submit',
          label: 'Submit',
          type: 'trigger',
          icon: '',
          trigger: () => {}, // No-op function
          disabled: false,
          style: 'main',
        },
      ],
      buttonsPosition: 'right',
      inline: true,
    };
  }

  private initializeForm() {
    this.formData = {
      ...this.defaultFormData,
      ...this.formData,
      formData: this.mergeFieldData(),
      buttons: this.formData.buttons?.map((button) => ({
        ...this.defaultFormData.buttons![0],
        ...button,
      })) || this.defaultFormData.buttons,
    };
  }

  private mergeFieldData() {
    return this.formData.formData.map((group) => ({
      field: group.field.map((field) => ({
        ...this.defaultFormData.formData[0].field[0],
        ...field,
      })),
    }));
  }

  private populateFormModel() {
    this.formData.formData.forEach((group) => {
      group.field.forEach((field) => {
        this.formModel[field.name] = field.defaultValue ?? '';
      });
    });
  }

  checkForErrors(fieldName: string, value: any, isRequired: boolean) {
    if (isRequired) {
      // Set error only if the required field is empty (empty string, null, or undefined)
      this.formErrors[fieldName] = value === '' || value === null || value === undefined;
    } else {
      // No error for non-required fields
      this.formErrors[fieldName] = false;
    }
  }


  onInputChange(fieldName: string, event: any, isRequired?: boolean) {
    setTimeout(() => {
      const value = event.target.value;
      this.formModel[fieldName] = value;
      this.checkForErrors(fieldName, value, isRequired || false);
      console.log(this.formErrors); // Debugging
    }, 0);
  }

  autoResize(fieldName: string, event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.formModel[fieldName] = textarea?.value || '';
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Adjust height
    console.log(this.formModel); // Debugging
  }

  switchChange(newValue: boolean, fieldName: string, isRequired?: boolean) {
    this.formModel[fieldName] = newValue;
    this.checkForErrors(fieldName, newValue, isRequired || false);
    console.log(this.formModel, this.formErrors); // Debugging
  }

  sliderChange(newValue: any, fieldName: string, isRequired?: boolean) {
    this.formModel[fieldName] = newValue;
    this.checkForErrors(fieldName, newValue, isRequired || false);
    console.log(this.formModel, this.formErrors); // Debugging
  }

  fileUpload(newValue: any, fieldName: string, isRequired?: boolean) {
    this.formModel[fieldName] = newValue;
    this.checkForErrors(fieldName, newValue, isRequired || false);
    console.log(this.formModel, this.formErrors); // Debugging
  }

  checkboxChange(newValue: any, fieldName: string, isRequired?: boolean) {
    this.switchChange(newValue, fieldName, isRequired);
  }

  selectChange(newValue: any, fieldName: string, isRequired?: boolean) {
    this.switchChange(newValue, fieldName, isRequired);
  }

  colorChange(newValue: any, fieldName: string, isRequired?: boolean) {
    this.switchChange(newValue, fieldName, isRequired);
  }

  onDateChanged(newValue: any, fieldName: string, isRequired?: boolean) {
    this.switchChange(newValue, fieldName, isRequired);
  }

  submitForm() {
    if (this.isFormValid()) {
      console.log(this.formModel); // Proceed with form submission logic
    } else {
      console.error('Form is invalid');
    }
  }

  private isFormValid() {
    return Object.keys(this.formModel).every((fieldName) => {
      const field = this.getFieldByName(fieldName);
      const value = this.formModel[fieldName];
      const isRequired = field?.required || false;
      return !isRequired || (value !== '' && value !== null && value !== undefined);
    });
  }

  private getFieldByName(fieldName: string): FormData | undefined {
    for (const group of this.formData.formData) {
      const field = group.field.find(f => f.name === fieldName);
      if (field) return field;
    }
    return undefined;
  }


  resetForm() {
    this.formModel = {};
    this.populateFormModel();
    console.log(this.formModel); // Debugging
  }

  buttonTrigger(button: FormButtons) {
    if (button.type === 'submit') {
      this.submitForm();
    } else if (button.type === 'reset') {
      this.resetForm();
    } else if (button.type === 'trigger' && button.trigger) {
      button.trigger(); // Call custom trigger function
    }
  }

  onButtonClick(button: FormButtons) {
    this.buttonTrigger(button);
  }
}

// Interfaces for form structure
export interface FormProperties {
  name: string;
  apiUrl: string;
  apiType: 'GET' | 'POST' | 'PUT' | 'DELETE';
  formData: FormGroup[];
  buttons?: FormButtons[];
  buttonsPosition?: 'left' | 'right';
  inline?: boolean;
}

export interface FormGroup {
  field: FormData[];
}

export interface FormData {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'color' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'switch' | 'slider' | 'file';
  required?: boolean;
  value?: string | number | boolean | Date;
  defaultValue?: string;
  defaultValueSlider?: number;
  multiple?: boolean;
  search?: boolean;
  placeholder?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number | Date;
  max?: number | Date;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  options?: Array<{ label: string; value: string }>;
  helpText?: string;
  errorText?: string;
  onChange?: (value: string) => void;
  icon?: string;
  inline?: boolean;
  dateProperties?: DateProperties;
  fileType?:string[];
}

export interface FormButtons {
  name: string;
  label: string;
  type?: 'submit' | 'reset' | 'trigger';
  icon?: string;
  trigger?: () => void;
  disabled?: boolean;
  style?: 'main' | 'secondary' | 'tertiary' | 'danger';
}

export interface DateProperties {
  date: Date;
  dateFormat: 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd-MM-yyyy' | 'dd/MM/yyyy' | 'MMM dd, yyyy' | 'fullDate' | 'longDate';
  displayTime: boolean;
  timeFormat?: '24' | '12';
  minDate?: Date;
  maxDate?: Date;
  disableDates?: Date[];
  timezone?: string;
}
