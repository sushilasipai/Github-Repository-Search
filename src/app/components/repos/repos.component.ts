import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  repoSearchString: String;
  repos: String[];
  totalItems: any;
  noOfPages: number;
  itemPerPage = 10;
  page = 1;
  sortCriteria = 'stars';
  oddNoData = false;

  constructor(public githubService: GithubService) {}

  ngOnInit(): void {
    this.repos = JSON.parse(sessionStorage.getItem('repos'));

    //on first time page load set default values to session storage
    if (!this.repos) {
      sessionStorage.setItem('sortCriteria', JSON.stringify(this.sortCriteria));
      sessionStorage.setItem('itemPerPage', JSON.stringify(this.itemPerPage));
      sessionStorage.setItem('page', JSON.stringify(this.page));
      sessionStorage.setItem('oddNoData', JSON.stringify(this.oddNoData));
    }
    this.loadValues();
  }

  //get values from session variables to local variables
  loadValues() {
    this.repoSearchString = JSON.parse(
      sessionStorage.getItem('repoSearchString')
    );
    this.itemPerPage = JSON.parse(sessionStorage.getItem('itemPerPage'));
    this.page = JSON.parse(sessionStorage.getItem('page'));
    this.sortCriteria = JSON.parse(sessionStorage.getItem('sortCriteria'));
    this.noOfPages = JSON.parse(sessionStorage.getItem('noOfPages'));
    this.oddNoData = JSON.parse(sessionStorage.getItem('oddNoData'));
  }

  //change no of items per page
  itemPerPageChange(itemPerPage) {
    this.itemPerPage = itemPerPage;
    sessionStorage.setItem('itemPerPage', JSON.stringify(this.itemPerPage));
    this.calcTotalPages();
    this.searchRepos();
  }

  //calculate total no of pages
  calcTotalPages() {
    this.noOfPages = Math.ceil(+this.totalItems / +this.itemPerPage);
    sessionStorage.setItem('noOfPages', JSON.stringify(this.noOfPages));
  }

  //change page no
  changePage(page) {
    this.page = page;
    sessionStorage.setItem('page', JSON.stringify(this.page));
    this.searchRepos();
  }

  //sort repositories according to search criteria
  sortRepos(sortCriteria) {
    this.sortCriteria = sortCriteria;
    sessionStorage.setItem('sortCriteria', JSON.stringify(this.sortCriteria));
    this.searchRepos();
  }

  //validate parameters for repository search
  inputValidation() {
    if (this.repoSearchString) {
      //start new string search at first page
      if (
        this.repoSearchString !=
        JSON.parse(sessionStorage.getItem('repoSearchString'))
      ) {
        sessionStorage.setItem(
          'repoSearchString',
          JSON.stringify(this.repoSearchString)
        );
        this.changePage(1);
      }

      //changes page to ceiling if decimal no provided
      this.page = Math.ceil(this.page);

      //searches repo only if page no is valid
      if (!this.noOfPages || (this.page > 0 && this.page <= this.noOfPages)) {
        return true;
      } else {
        alert('Invalid page number!!');
        return false;
      }
    } else {
      alert('Please enter search string!!');
      return false;
    }
  }

  //gets repositories that match the search string
  searchRepos(repoSearchString = this.repoSearchString) {
    this.repoSearchString = repoSearchString;

    if (this.inputValidation()) {
      this.repos = ['null'];

      const repourl =
        'https://api.github.com/search/repositories?q=' +
        this.repoSearchString +
        '&sort=' +
        this.sortCriteria +
        '&order=desc&page=' +
        this.page +
        '&per_page=' +
        this.itemPerPage;

      //subscription to github api response via service
      this.githubService.getRepoInfo(repourl).subscribe(
        (data) => {
          if (data.total_count == 0) {
            this.repos = ['no data'];
          } else {
            //api has data limit of max 1000
            this.totalItems = data.total_count > 1000 ? 1000 : data.total_count;
            this.repos = data.items;
            sessionStorage.setItem('repos', JSON.stringify(this.repos));
            this.calcTotalPages();
            this.oddNoData = data.items.length % 2 == 0 ? false : true;
            sessionStorage.setItem('oddNoData', JSON.stringify(this.oddNoData));
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
