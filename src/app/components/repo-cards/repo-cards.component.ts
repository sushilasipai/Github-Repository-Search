import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repo-cards',
  templateUrl: './repo-cards.component.html',
  styleUrls: ['./repo-cards.component.scss'],
})
export class RepoCardsComponent {
  constructor(private router: Router) {}

  @Input() repos: String[];
  @Input() oddNoData: boolean;

  //show repository details of selected card
  showDetails(id) {
    this.router.navigate(['details', id]);
  }
}
