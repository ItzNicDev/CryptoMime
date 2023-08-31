import {Component, OnInit, ViewChild} from '@angular/core';
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('content') private content: any;

  public jsonObj: any = null;
  public keys: any = null;

  constructor(private cache: CacheService) {

    if(this.cache.get("json")){
      this.jsonObj = JSON.parse(this.cache.get("json"))
      this.keys = Object.keys(this.jsonObj);
    }

  }


  ngOnInit() {

  }


  scrollDown() {
    this.content.scrollToPoint(0, 350, 1500);
  }


}
