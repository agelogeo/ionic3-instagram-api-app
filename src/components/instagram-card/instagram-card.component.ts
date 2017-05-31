import { Component, Input } from '@angular/core';

@Component({
  selector: 'instagram-card',
  templateUrl: 'instagram-card.component.html'
})
export class InstagramCardComponent {

  @Input() public medias;
  @Input() public isGrade;

  constructor() {
   
  }

}
