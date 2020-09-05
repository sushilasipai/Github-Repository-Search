import { Component, OnInit, Output } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  repoSearchString: String;

  @Output() searchRepoEvent: EventEmitter<String[]> = new EventEmitter<
    String[]
  >();

  ngOnInit(): void {}

  constructor(private githubService: GithubService) {}

  //gets repositories that match the search string
  searchRepos() {
    //emits null value to parent while loading the repository list
    this.searchRepoEvent.emit(['null']);

    const repourl =
      'https://api.github.com/search/repositories?q=' +
      this.repoSearchString +
      '&sort=stars&order= desc';

    this.githubService.getRepoInfo(repourl).subscribe((data) => {
      console.log('repos');
      console.log(data);
      this.searchRepoEvent.emit(data.items);
    });
  }
}
