import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReposComponent } from './repos/repos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReposComponent, RepoDetailComponent],
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
