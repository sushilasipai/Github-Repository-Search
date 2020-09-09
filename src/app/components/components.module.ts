import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReposComponent } from './repos/repos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';
import { RouterModule } from '@angular/router';
import { RepoCardsComponent } from './repo-cards/repo-cards.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [ReposComponent, RepoDetailComponent, RepoCardsComponent, SearchbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [ReposComponent, RepoDetailComponent],
})
export class ComponentsModule {}
