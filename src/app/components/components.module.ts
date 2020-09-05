import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReposComponent } from './repos/repos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from './loading/loading.component';
import { SearcherComponent } from './searcher/searcher.component';
import { SortPipe } from '../pipes/sort/sort.pipe';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';

@NgModule({
  declarations: [
    ReposComponent,
    LoadingComponent,
    SearcherComponent,
    RepoDetailComponent,
    SortPipe,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgxPaginationModule],
  providers: [],
  bootstrap: [],
  exports: [
    ReposComponent,
    LoadingComponent,
    SearcherComponent,
    RepoDetailComponent,
    SortPipe,
  ],
})
export class ComponentsModule {}
