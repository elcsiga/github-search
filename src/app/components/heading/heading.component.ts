import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {

  @Input() preTitle: string;
  @Input() title: string;
  @Input() subTitle: string;

}
