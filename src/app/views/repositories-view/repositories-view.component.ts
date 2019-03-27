import {Component} from '@angular/core';
import {GithubService} from '../../services/github-service/github.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ProgressStatus} from '../../components/page-loading-indicator/page-loading-indicator.component';

@Component({
  selector: 'app-repositories-view',
  templateUrl: './repositories-view.component.html',
  styleUrls: ['./repositories-view.component.scss']
})
export class RepositoriesViewComponent {

  progressStatus: ProgressStatus = 'loading';

  repoName$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('repoName'))
  );

  searchResults$ = this.repoName$.pipe(
    tap(() => this.progressStatus = 'loading'),
    switchMap(repoName => this.githubService.searchRepositories(repoName as string)),
    tap(() => this.progressStatus = 'done'),
    catchError(() => {
      this.progressStatus = 'error';
      return of(GithubService.emptyResponse);
    })
  );

  constructor(
    private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {
  }
}
