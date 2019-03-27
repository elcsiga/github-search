import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundViewComponent} from './views/page-not-found-view/page-not-found-view.component';
import {HomeViewComponent} from './views/home-view/home-view.component';
import {RepositoriesViewComponent} from './views/repositories-view/repositories-view.component';
import {IssuesViewComponent} from './views/issues-view/issues-view.component';

export const routes: Routes = [
  {
    path: 'repositories/:repoName',
    component: RepositoriesViewComponent,
  },
  {
    path: 'issues/:userName/:repoName',
    component: IssuesViewComponent,
  },
  { path: '',
    component: HomeViewComponent,
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
