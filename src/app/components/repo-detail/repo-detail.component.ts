import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import * as showdown from 'showdown';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss'],
})
export class RepoDetailComponent implements OnInit {
  readmeRaw = 'null';
  id: String;
  repoDetail: any;
  repos: any;

  constructor(
    private githubService: GithubService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showRepoDetails();
  }

  //go to home page on back button click
  getRepoList() {
    this.githubService.backFlg = true;
    this.router.navigateByUrl('home');
  }

  //get repository details of the selected repo
  showRepoDetails() {
    this.repoDetail = this.githubService.getRepoDetails();

    const readmeurl = this.repoDetail.url + '/readme';

    this.githubService.getRepoInfo(readmeurl).subscribe((data) => {
      var converter = new showdown.Converter();
      this.readmeRaw = converter.makeHtml(this.b64_to_utf8(data.content));
    });
  }

  //decodes base64 to UTF-8
  b64_to_utf8(str) {
    str = str.replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(str)));
  }
}
