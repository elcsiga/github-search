import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchHeaderComponent} from './components/search-header/search-header.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatExpansionModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeViewComponent} from './views/home-view/home-view.component';
import {RepositoriesViewComponent} from './views/repositories-view/repositories-view.component';
import {IssuesViewComponent} from './views/issues-view/issues-view.component';
import {PageNotFoundViewComponent} from './views/page-not-found-view/page-not-found-view.component';
import {TimeIntervalChartComponent} from './components/time-interval-chart/time-interval-chart.component';
import {NgxMdModule} from 'ngx-md';
import {HeadingComponent} from './components/heading/heading.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import { PageLoadingIndicatorComponent } from './components/page-loading-indicator/page-loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchHeaderComponent,
    HomeViewComponent,
    RepositoriesViewComponent,
    IssuesViewComponent,
    PageNotFoundViewComponent,
    TimeIntervalChartComponent,
    HeadingComponent,
    ErrorMessageComponent,
    PageLoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMdModule.forRoot(),
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
