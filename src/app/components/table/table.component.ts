import { Component, Input, OnInit, HostListener, Output, EventEmitter, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'uc2ui-table',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnChanges {
  @Input() tableData!: TableData;
  @Output() paramChange = new EventEmitter<{ keywords: string, sortBy: string, sortDir: string, pageSize: number, pageNumber: number, filters: { [key: string]: any }; }>(); // Emit sorting and pagination event

  private searchSubject = new Subject<string>();

  selectAll: boolean = false;
  sortBy: string = '';
  sortDesc: boolean = false;
  sortDir: string = '';
  pageSize: number = 10;
  isSearch: boolean = false;
  itemStart: number = 0;
  itemEnd: number = 0;
  totalItems: number = 0;
  pageCount: number = 0;
  dropdownOpen: boolean = false;
  selectedValue: number = 10; // Default selected value
  currPage: number = 1; // Start at page 1 by default
  lastPage: number = 1;
  keywords: any
  selectedFilterCategory: TableFilters | null = null;
  isFilters: boolean = false
  filters: { [key: string]: any } = {};
  private _visiblePages: number[] = [];
  loading: boolean = false


  gridTemplateColumns: string = '';


  constructor(
    private renderer: Renderer2
  ) {
    // this.gridTemplateColumns = this.tableData.header
    // .map(header => (header.name === 'actions' ? '80px' : '1fr'))
    // .join(' ');

  }

  ngOnInit(): void {
    console.log('ngOnInit tableData', this.tableData);
    // this.renderer.listen('document', 'click', (event: Event) => {
    //   this.onClickOutside(event);
    // });

    // Calculate total pages based on totalRecords and pageSize
    // this.totalItems = this.tableData?.totalRecords || 0;
    // this.lastPage = Math.ceil(this.totalItems / this.pageSize);
    this.loading = true

    this.searchSubject
      .pipe(
        debounceTime(200), // 200ms delay
        distinctUntilChanged() // Emit only if the query has changed
      )
      .subscribe(query => {
        this.keywords = query;
        this.paramChange.emit({
          keywords: this.keywords,
          sortBy: this.sortBy,
          sortDir: this.sortDir,
          pageSize: this.pageSize,
          pageNumber: this.currPage,
          filters: this.filters,
        });
      });
      this.updateVisiblePages();
  }

  updateGridTemplateColumns(): void {
    if (this.tableData) {
      this.gridTemplateColumns = this.calcColumns(this.tableData.header);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges tableData', this.tableData, changes);

    if (changes['tableData']) {
      this.updateGridTemplateColumns();
      this.loading = false
    }
    // Recalculate total pages if totalRecords or pageSize changes
    if (changes['tableData'] && this.tableData) {
      this.totalItems = this.tableData.totalRecords || 0;
      this.lastPage = Math.ceil(this.totalItems / this.pageSize);

      this.updateItemRange();
    }

  this.updateVisiblePages();
  }

  // Getter to check if filters is not empty
  get hasFilters(): boolean {
    return Object.keys(this.filters).length > 0;
  }

  // Calculate the grid-template-columns for the table
  // calcColumns(items: TableHeader[]): string {
  //   console.log("calcColumns", items)
  //   let columns = '';

  //   if (this.tableData.selectable) {
  //     columns += '0.1fr ';
  //   }

  //   columns += `repeat(${items.length}, 1fr) `;

  //   if (items.some(item => item.name.toLowerCase() === 'actions')) {
  //     // columns += '70px';
  //   }

  //   return columns;
  // }

  calcColumns(items: TableHeader[]): string {
    console.log("calcColumns", items);
    let columns = '';

    if (this.tableData.selectable) {
      columns += '42px ';
    }

    if (!items || items.length === 0) {
      return '1fr'; // Fallback to one column if no headers are provided
    }

    items.forEach(item => {
        if (item.name.toLowerCase() === 'actions') {
            columns += '120px ';
        } else {
            if (item.width) {
                columns += typeof item.width === 'number' ? `${item.width}px ` : `${item.width} `;
            } else {
                columns += 'minmax(150px, 1fr) '; // Ensures columns have a min width
            }
        }
    });

    console.log('columns:', columns.trim());
    return columns.trim();
  }

  // Toggle the dropdown menu visibility for a specific row
  toggleDropdown(row: TableRow) {
    this.tableData.body.forEach((r) => {
      if (r !== row) {
        r['showDropdown'] = false;
      }
    });
    row['showDropdown'] = !row['showDropdown'];
  }

  // Handle click outside of the dropdown menu to close it
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;

    this.tableData.body.forEach((row) => {
      if (
        row['showDropdown'] &&
        !targetElement.closest('.dropdown-menu') &&
        !targetElement.closest('.action-cell')
      ) {
        row['showDropdown'] = false;
      }
    });
  }

  // Handle sorting when a sortable header is clicked
  toggleSort(sortBy: string) {
    console.log('Order By: ', sortBy);

    this.sortBy = sortBy;
    this.sortDesc = !this.sortDesc;

    this.sortDir = this.sortDesc ? 'desc' : 'asc';

    this.loading = true


    // Emit the sorting change event
    this.paramChange.emit({
      keywords: this.keywords,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      pageSize: this.pageSize,
      pageNumber: this.currPage,
      filters: this.filters,
    });
  }

  // Handle select all checkbox change
  onSelectAllChange() {
    this.tableData.body.forEach((row) => {
      row['selected'] = this.selectAll;
    });
    this.updateSelectedRows();
  }

  // Handle individual row selection change
  onRowSelectChange(row: TableRow) {
    this.updateSelectedRows();
    this.selectAll = this.tableData.body.every((row) => row['selected']);
  }

  // Update the selected rows array based on the current selection
  updateSelectedRows() {
    this.tableData.selectedRows = this.tableData.body.filter((row) => row['selected']);
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }

  // Method to emit the search query with a delay
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchSubject.next(query); // Emit the query to the subject
  }

  toggleSelect() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log("toggleSelect",this.dropdownOpen)
  }



  selectItem(value: number) {
    this.pageSize = value;
    this.dropdownOpen = false;
    console.log("selectItem",this.dropdownOpen)

    // Recalculate last page based on new pageSize
    this.lastPage = Math.ceil(this.totalItems / this.pageSize);

    this.updateItemRange();

    this.loading = true

    this.paramChange.emit(
      {
        keywords: this.keywords,
        sortBy: this.sortBy,
        sortDir: this.sortDir,
        pageSize: this.pageSize,
        pageNumber: this.currPage,
        filters: this.filters,
       }
    );
  }

  // onClickOutside(event: Event) {
  //   const targetElement = event.target as HTMLElement;
  //   const dropdown = document.querySelector('.uc2ui-dropdown');

  //   if (dropdown && !dropdown.contains(targetElement)) {
  //     this.dropdownOpen = false;
  //   }

  //   console.log("HostListener", this.dropdownOpen, dropdown, targetElement);
  // }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: Event) {
  //   const targetElement = event.target as HTMLElement;
  //   const dropdown = document.querySelector('.uc2ui-dropdown');

  //   if (dropdown) {
  //     // Check if the click occurred outside the dropdown
  //     if (!dropdown.contains(targetElement)) {
  //       this.dropdownOpen = false;
  //     } else {
  //       console.log("Click happened inside the dropdown");
  //     }
  //   }

  //   console.log("HostListener", this.dropdownOpen, dropdown, targetElement);
  // }

  navigatePage(page: number) {
    if (page < 1 || page > this.lastPage || page === this.currPage) return;

    this.currPage = page;

    this.updateItemRange();

    this.loading = true

    this.paramChange.emit({
      keywords: this.keywords,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      pageSize: this.pageSize,
      pageNumber: this.currPage,
      filters: this.filters,
    });
  }

  updateItemRange() {
    this.itemStart = (this.currPage - 1) * this.pageSize + 1;
    this.itemEnd = Math.min(this.itemStart + this.pageSize - 1, this.totalItems);
  }

  // Define the visible page numbers

  updateVisiblePages(): void {
    const totalPages = this.lastPage;
    const currPage = this.currPage;
    const maxPagesToShow = 5; // Total number of pages to show (including ellipses)
    const pages: number[] = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages are within the limit, show all pages
      this._visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
      return;
    }

    // Calculate bounds for pages
    const leftBound = Math.max(1, currPage - 2);
    const rightBound = Math.min(totalPages, currPage + 2);

    if (leftBound > 2) {
      pages.push(1); // First page
      pages.push(-1); // Ellipsis
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages - 1) {
      pages.push(-1); // Ellipsis
      pages.push(totalPages); // Last page
    }

    this._visiblePages = pages;
  }

  // get visiblePages(): number[] {
  //   return this._visiblePages;
  // }

  onPageChange(newPage: number): void {
    this.currPage = newPage;
    this.updateVisiblePages();
  }

  get visiblePages(): number[] {
    const totalPages = this.lastPage;
    const currPage = this.currPage;
    const maxPagesToShow = 5; // Maximum pages to show, including ellipses
    const pages: number[] = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages are within the limit, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate bounds for pages
    const leftBound = Math.max(1, currPage - 2);
    const rightBound = Math.min(totalPages, currPage + 2);

    if (leftBound > 2) {
      pages.push(1); // First page
      pages.push(-1); // Ellipsis
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages - 1) {
      pages.push(-1); // Ellipsis
      pages.push(totalPages); // Last page
    }

    return pages;
  }



  goToPage(page: number): void {
    if (page === -1 || page === this.currPage) {
      return;
    }

    if (page < 1) {
      this.currPage = 1;
    } else if (page > this.lastPage) {
      this.currPage = this.lastPage;
    } else {
      this.currPage = page;
    }

    this.loading = true

    this.paramChange.emit({
      keywords: this.keywords,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      pageSize: this.pageSize,
      pageNumber: this.currPage,
      filters: this.filters,
    });
  }

  toggleFilters(){
    this.isFilters = !this.isFilters
  }

  onCategorySelectChange(category: TableFilters): void {
    this.selectedFilterCategory = category.selected ? category : null;
    // Additional logic to handle category selection
  }

  onValueSelectChange(value: FilterValues): void {
    // Logic to handle value selection within the selected category
  }

  applyFilter() {
    this.filters = {}; // Reset filters

    this.tableData.filters?.forEach(category => {
      const selectedValues = category.values.filter(v => v.selected);
      console.log(selectedValues)

      if (selectedValues.length > 0) {
        this.filters[category.name] = selectedValues.map(v => v.name);
      }
    });

    console.log("applyfilters", this.filters);

    this.loading = true

    // Emit the parameters with the current filters applied
    this.paramChange.emit({
      keywords: this.keywords,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      pageSize: this.pageSize,
      pageNumber: this.currPage,
      filters: this.filters,
    });
  }



  clearFilters() {
    if (this.tableData?.filters) {
      this.tableData.filters.forEach(category => {
        category.selected = false;
        if (category.values) {
          category.values.forEach(value => {
            value.selected = false;
          });
        }
      });
    }
  }

  refreshTable(){
    console.log(this.tableData)
  }

}

// Interfaces
export interface TableData {
  name: string;
  header: TableHeader[];
  body: TableRow[];
  selectable?: boolean;
  search?: boolean;
  pagination?: boolean;
  buttons?: TableButtons[];
  buttonsPosition?: string;
  selectedRows?: TableRow[];
  totalRecords?: number;
  filters?: TableFilters[];
  maxHeight?: string
}

export interface TableHeader {
  name: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  [key: string]: any;
  actions?: TableAction[];
  selected?: boolean;
  showDropdown?: boolean;
}

export interface TableAction {
  name: string;
  icon?: string;
  position?: string;
  callback: (id: any, data?: any) => void;
}

export interface TableParams {
  filters?: any;
  pageNumber?: string;
  pageSize?: string;
  sortBy?: string;
  sortDir?: string;
  keywords?: any;
}

export interface TableButtons {
  label: string;
  icon?: string;
  position?: string;
  callback: () => void;
}

export interface TableRecords {
  content: any[];
  totalRecords: number;
}

export interface TableFilters {
  name: string;
  label: string;
  values: FilterValues[];
  selected?: boolean;  // Optional, to track selection
}

export interface FilterValues {
  name: string;
  label: string;
  value: string;
  selected?: boolean;  // Optional, to track selection
}
