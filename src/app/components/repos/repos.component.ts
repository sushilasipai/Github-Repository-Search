import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  itemPerPage = 10;
  page = 1;
  sortCriteria: string;

  @Input() repos: String[];

  @Output() showDetailsEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  //loads first page when no of items per page changed
  itemPerPageChange(itemPerPage) {
    this.page = 1;
    this.itemPerPage = itemPerPage;
  }

  //emits id to parent when any row on the list is selected
  showRepoDetails(id) {
    this.showDetailsEvent.emit(id);
  }
}
