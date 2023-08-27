import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent  implements OnInit {
  @ViewChild('content') private content: any;

  constructor() { }

  ngOnInit() {}


  scrollDown(){
    this.content.scrollToPoint(0,350,500);
  }


}
