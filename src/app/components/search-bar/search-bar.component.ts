import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

interface SearchResult {
  content: any[];
  totalRecords: number;
}

@Component({
  selector: 'uc2ui-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnChanges {
  @Input() searchResult!: SearchResult;
  @Input() label: string = ''; // Field to use as the label in the search results
  @Input() sortBy: string = ''; // Field to sort by
  @Input() sortDir: string = ''; // Sort direction
  @Input() pageSize: number = 10; // Number of items per page

  @Output() searchTriggered = new EventEmitter<any>(); // Emits the search request body
  @Output() itemClicked = new EventEmitter<any>(); // Emits the clicked item

  searchQuery: string = ''; // User's search input
  isLoading: boolean = false; // Controls the spinner
  pageNumber: number = 1; // Tracks the current page for pagination
  private searchQuerySubject = new Subject<string>(); // Subject for debounce functionality

  constructor() {
    this.searchQuerySubject.pipe(debounceTime(200)).subscribe(() => {
      this.triggerSearch();
    });
  }

  ngOnChanges(): void {
    console.log('SearchBarComponent', this.searchResult);
  }

  onSearch(): void {
    this.isLoading = true; // Show spinner while processing the search
    this.searchQuerySubject.next(this.searchQuery);
  }

  onItemClicked(item: any): void {
    this.itemClicked.emit(item); // Emit the clicked item to the parent
  }

  getLabel(item: any): string {
    return item[this.label] || ''; // Dynamically resolve the label field
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight && !this.isLoading) {
      this.loadMore();
    }
  }

  private triggerSearch(): void {
    // Construct the request body
    const requestBody = {
      keywords: this.searchQuery,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
    };

    this.searchTriggered.emit(requestBody); // Emit the request body
    this.isLoading = false; // Hide spinner after emitting the search
  }

  private loadMore(): void {
    if (this.searchResult.content.length < this.searchResult.totalRecords) {
      this.isLoading = true;
      this.pageNumber++; // Increment the page number

      // Construct the request body for the next page
      const requestBody = {
        keywords: this.searchQuery,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        sortDir: this.sortDir,
      };

      this.searchTriggered.emit(requestBody); // Emit the load more request body
      this.isLoading = false;
    }
  }
}
