import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  repoSearchString: String;
  repos: String[];
  totalItems: any;
  itemPerPage = 10;
  page = 1;
  sortCriteria = 'stars';
  repoDetail: String;
  noOfPages: number;

  constructor(private router: Router, private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.sortCriteria = this.sortCriteria;
    this.githubService.itemPerPage = this.itemPerPage;
    this.githubService.page = this.page;

    //load previous repository list when back from detail page
    if (this.githubService.backFlg) {
      this.repos = this.githubService.repos;
      this.repoSearchString = this.githubService.repoSearchString;
      this.sortCriteria = this.githubService.sortCriteria;
      this.itemPerPage = this.githubService.itemPerPage;
      this.page = this.githubService.page;
      this.githubService.backFlg = false;
    }
  }

  //change no of items per page
  itemPerPageChange(itemPerPage) {
    this.itemPerPage = itemPerPage;
    this.githubService.itemPerPage = this.itemPerPage;
    this.searchRepos();
  }

  //change page no
  changePage(page) {
    this.page = page;
    this.githubService.page = this.page;
    this.searchRepos();
  }

  //gets repositories that match the search string
  searchRepos() {
    if (this.repoSearchString) {
      this.page = Math.ceil(this.page);

      if (!this.noOfPages || (this.page > 0 && this.page <= this.noOfPages)) {
        this.repos = ['null'];
        this.githubService.repoSearchString = this.repoSearchString;

        const repourl =
          'https://api.github.com/search/repositories?q=' +
          this.repoSearchString +
          '&sort=' +
          this.sortCriteria +
          '&order=desc&page=' +
          this.page +
          '&per_page=' +
          this.itemPerPage;

        console.log(repourl);
        this.githubService.getRepoInfo(repourl).subscribe((data) => {
          this.repos = data.items;
          this.totalItems = data.total_count;
          this.githubService.repos = this.repos;
          this.noOfPages = Math.ceil(+this.totalItems / +this.itemPerPage);
          console.log(data);
          console.log('no of pages' + this.noOfPages);
        });
      } else {
        alert('Invalid page number!!');
      }
    } else {
      alert('Please enter search string!!');
    }
  }

  //sort repositories according to search criteria
  sortRepos(sortCriteria) {
    this.sortCriteria = sortCriteria;
    this.githubService.sortCriteria = this.sortCriteria;
    this.searchRepos();
  }

  //show repository details on table row click
  showDetails(id) {
    this.githubService.selectedId = id;
    this.router.navigateByUrl('details');
  }
}
