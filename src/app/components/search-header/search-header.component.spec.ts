import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchHeaderComponent} from './search-header.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {GithubService, Repo, SearchResponse} from '../../services/github-service/github.service';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent;
  let fixture: ComponentFixture<SearchHeaderComponent>;

  const githubServiceSpy = jasmine.createSpyObj<GithubService>('GithubService', ['searchRepositories']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        MatAutocompleteModule
      ],
      providers: [
        {provide: GithubService, useValue: githubServiceSpy}
      ],
      declarations: [SearchHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Autocomplete', () => {

    beforeEach(() => {
      githubServiceSpy.searchRepositories.and.returnValue(of({
        total_count: 3,
        incomplete_results: false,
        items: [
          {name: 'cat'},
          {name: 'cat'},
          {name: 'bear'}
        ]
      } as SearchResponse<Repo>).pipe(
        delay(300)
      ));
    });

    it('should not call the service in case of the search imput is empty', fakeAsync(() => {
      component.searchForm.get('searchInput').setValue('');
      tick(1000);

      expect(githubServiceSpy.searchRepositories).not.toHaveBeenCalled();
      expect(component.repoNameTips).toEqual([]);
      expect(component.loadingInProgress).toBeFalsy();
    }));

    it('should call the service with any non empty search expression', fakeAsync(() => {
      component.searchForm.get('searchInput').setValue('c');
      tick(1000);

      expect(githubServiceSpy.searchRepositories).toHaveBeenCalledWith('c');
      expect(component.loadingInProgress).toBeFalsy();
    }));

    it('should remove duplicates from search results', fakeAsync(() => {
      component.searchForm.get('searchInput').setValue('c');
      tick(1000);
      expect(component.repoNameTips).toEqual(['cat', 'bear']);
    }));

    it('should show and hide loading indicator', fakeAsync(() => {
      component.searchForm.get('searchInput').setValue('c');
      tick(100);
      expect(component.loadingInProgress).toBeFalsy();
      tick(600);
      expect(component.loadingInProgress).toBeTruthy();
      tick(300);
      expect(component.loadingInProgress).toBeFalsy();
    }));

    it('should fail silently if Github API does not respond', fakeAsync(() => {
      githubServiceSpy.searchRepositories.and.callFake( () => of(new HttpResponse())); // returns a http error response
      component.searchForm.get('searchInput').setValue('c');
      tick(1000);
      expect(component.loadingInProgress).toBeFalsy();
      expect(component.repoNameTips).toEqual([]);
    }));

    it('should show maximum 10 results', fakeAsync(() => {
      githubServiceSpy.searchRepositories.and.returnValue(of({
        total_count: 30,
        incomplete_results: false,
        items: Array(30).fill(true).map((v, i) => ({name: 'R' + i})) // populating array of 30 results
      } as SearchResponse<Repo>));

      component.searchForm.get('searchInput').setValue('c');
      tick(1000);

      expect(component.repoNameTips.length).toEqual(10);
    }));
  });
});
