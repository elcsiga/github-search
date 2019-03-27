import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {catchError, debounceTime, filter, finalize, map, switchMap} from 'rxjs/operators';
import {GithubService} from '../../services/github-service/github.service';
import {NavigationStart, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-repo-search',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  loadingInProgress = false;
  repoNameTips: string[] = [];
  private subscription: Subscription;
  private lastSubmittedRepoName = '';

  isOnMainPage$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map((event: NavigationStart) => event.url === '/')
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private githubService: GithubService
  ) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInput: null
    });

    this.subscription = this.getSearchInputField().valueChanges.pipe(
      debounceTime(600),
      filter(value => value.length > 0 && value !== this.lastSubmittedRepoName),
      switchMap(value => this.loadRepoNameTips(value))
    ).subscribe(repoNameTips => this.repoNameTips = repoNameTips);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch() {
    this.repoNameTips = [];
    const repoName = this.getSearchInputField().value;
    this.lastSubmittedRepoName = repoName;
    if (repoName.length) {
      this.router.navigate(['repositories', repoName]);
    }
  }

  private loadRepoNameTips(repoName: string): Observable<string[]> {
    this.loadingInProgress = true;
    return this.githubService.searchRepositories(repoName).pipe(
      finalize(() => {
        this.loadingInProgress = false;
        this.lastSubmittedRepoName = '';
      }),
      map(response => {
        const names = response.items.map(item => item.name);
        const nameSet = new Set(names); // removing duplicates
        return Array.from(nameSet).slice(0, 10);
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  private getSearchInputField() {
    return this.searchForm.get('searchInput');
  }
}




