import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Input() sortCriteria: string;
  @Input() itemPerPage: number;
  @Input() noOfPages: number;
  @Input() repoSearchString: string;
  @Input() page: number;

  @Output() sortReposEvent = new EventEmitter();
  @Output() searchReposEvent = new EventEmitter();
  @Output() itemPerPageChangeEvent = new EventEmitter();
  @Output() changePageEvent = new EventEmitter();
}
