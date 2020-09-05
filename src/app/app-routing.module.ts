import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposComponent } from './components/repos/repos.component';
import { RepoDetailComponent } from './components/repo-detail/repo-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: ReposComponent,
  },
  {
    path: 'details',
    component: RepoDetailComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
