import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repo-cards',
  templateUrl: './repo-cards.component.html',
  styleUrls: ['./repo-cards.component.scss'],
})
export class RepoCardsComponent implements OnInit {
  repos: String[];
  oddNoData: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.repos = JSON.parse(sessionStorage.getItem('repos'));
    this.oddNoData = JSON.parse(sessionStorage.getItem('oddNoData'));
  }

  //show repository details of selected card
  showDetails(id) {
    this.router.navigate(['details', id]);
  }
}
