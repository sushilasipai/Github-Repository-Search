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
  itemPerPage = 10;
  page = 1;
  sortCriteria: string;
  repoDetail: String;

  constructor(private router: Router, private githubService: GithubService) {}

  ngOnInit(): void {
    //load previous repository list when back from detail page
    if (this.githubService.backFlg) {
      this.repos = this.githubService.repos;
      this.githubService.backFlg = false;
    }
  }

  //loads first page when no of items per page changed
  itemPerPageChange(itemPerPage) {
    this.page = 1;
    this.itemPerPage = itemPerPage;
  }

  //gets repositories that match the search string
  searchRepos() {
    this.repos = ['null'];
    const repourl =
      'https://api.github.com/search/repositories?q=' +
      this.repoSearchString +
      '&sort=stars&order= desc';
    this.githubService.getRepoInfo(repourl).subscribe((data) => {
      this.repos = data.items;
      this.githubService.repos = this.repos;
    });
  }

  //show repository details on table row click
  showDetails(id) {
    this.githubService.selectedId = id;
    this.router.navigateByUrl('details');
  }
}
