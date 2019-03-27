import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

export type ProgressStatus = 'loading' | 'done' | 'error';

@Component({
  selector: 'app-page-loading-indicator',
  templateUrl: './page-loading-indicator.component.html',
  styleUrls: ['./page-loading-indicator.component.scss']
})
export class PageLoadingIndicatorComponent {
  @Input() progressStatus: ProgressStatus;
}
