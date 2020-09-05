import {
  Component,
  OnInit,
  Input,
  Output,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import * as showdown from 'showdown';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss'],
})
export class RepoDetailComponent implements OnInit {
  readmeRaw = 'null';

  @Input() repoDetail: any;

  @Output() getReposEvent = new EventEmitter();

  constructor(
    private githubService: GithubService,
    private elementRef: ElementRef
  ) {}

  //gets formatted readme.md contents
  ngOnInit() {
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

  //emits event to parent when back button clicked on detail page
  getRepoList() {
    this.getReposEvent.emit();
  }
}
