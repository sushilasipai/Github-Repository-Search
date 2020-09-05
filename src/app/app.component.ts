import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'git-repo-search';
  repos: String[];
  loadingFlg = false;
  detailFlg = false;
  repoDetail: String;
  pageHeader = 'Search Github Repository';

  constructor() {}

  //shows repository list or loading msg in the main page
  showData(data: String[]) {
    if (data[0] == 'null') {
      this.loadingFlg = true;
    } else {
      this.repos = data;
      this.loadingFlg = false;
    }
  }

  //shows repository details in the detail page
  showRepoDetails(id) {
    this.repos.filter((data) => {
      if (data['id'] == id) {
        this.detailFlg = true;
        this.pageHeader = 'Repository Details';
        this.repoDetail = data;
        this.repoDetail = JSON.parse(JSON.stringify(this.repoDetail));
      }
    });
  }

  //go back to main page from detail page
  showRepoList() {
    this.detailFlg = false;
    this.pageHeader = 'Search Github Repository';
  }
}
