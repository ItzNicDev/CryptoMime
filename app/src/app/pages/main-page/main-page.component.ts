import {Component, OnInit, ViewChild} from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {IonApp, Platform} from "@ionic/angular";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('content') private content: any;

  public jsonObj: any = null;
  public keys: any = null;
  public isDarkMode: boolean = false;

  constructor(private cache: CacheService) {

    if (this.cache.get("json")) {
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
