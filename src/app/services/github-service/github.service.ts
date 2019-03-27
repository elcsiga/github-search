import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Repo {
  name: string;
  full_name: string;
  open_issues_count: number;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}

export interface Issue {
  title: string;
  state: string;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
}

export interface SearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  static emptyResponse: SearchResponse<any> = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };

  private readonly baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  searchRepositories(name: string): Observable<SearchResponse<Repo>> {
    return this.http.get<SearchResponse<Repo>>(`${this.baseUrl}/search/repositories?q=${name}`);
  }

  searchIssues(userName: string, repoName: string): Observable<SearchResponse<Issue>> {
    return this.http.get<SearchResponse<Issue>>(`${this.baseUrl}/search/issues?q=repo:${userName}/${repoName}`);
  }
}
