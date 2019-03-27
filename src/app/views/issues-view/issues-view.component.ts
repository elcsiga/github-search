import {Component} from '@angular/core';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {GithubService} from '../../services/github-service/github.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {ProgressStatus} from '../../components/page-loading-indicator/page-loading-indicator.component';

@Component({
  selector: 'app-issues-view',
  templateUrl: './issues-view.component.html',
  styleUrls: ['./issues-view.component.scss']
})
export class IssuesViewComponent {

  progressStatus: ProgressStatus = 'loading';

  repoData$ = this.activatedRoute.paramMap.pipe(
    map(params => [params.get('userName'), params.get('repoName')])
  );

  repoFullName$ = this.repoData$.pipe(
    map(([userName, repoName]) => userName + '/' + repoName)
  );

  searchResults$ = this.repoData$.pipe(
    tap(() => this.progressStatus = 'loading'),
    switchMap(([userName, repoName]) => this.githubService.searchIssues(userName, repoName)),
    tap(() => this.progressStatus = 'done'),
    catchError(() => {
      this.progressStatus = 'error';
      return of(GithubService.emptyResponse);
    })
  );

  chartLegend = [
    {title: 'Open issues', color: 'red'},
    {title: 'Closed issues', color: 'steelblue'}
  ];

  toBarChartData(results) {
    return results.items.map(
      issue => ({
        title: issue.title,
        from: new Date(issue.created_at),
        to: issue.closed_at ? new Date(issue.closed_at) : new Date(),
        color: issue.closed_at ? 'steelblue' : 'red'
      })
    );
  }

  constructor(
    private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {
  }
}
