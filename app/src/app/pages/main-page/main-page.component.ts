import {Component, OnInit, ViewChild} from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {IonApp, Platform} from "@ionic/angular";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('content') private content: any;

  public jsonObj: any = null;
  public keys: any = null;
  // public isDarkMode: boolean = false;


  public boughtCurrencyList: string[] = [];
  public boughtCurrencyPrices: any[] = [];
  public boughtCurrencyAmount: number[] = [];


  public calculatedWorth: number[] = [];

  constructor(private cache: CacheService, private api: ApiService) {

  }


  async ngOnInit() {

    //sofern es die json gibt!
    if (this.cache.get("json")) {
      this.jsonObj = JSON.parse(this.cache.get("json"))
      for (const key in this.jsonObj) {
        this.boughtCurrencyList.push(key)
        this.boughtCurrencyPrices.push((await this.api.getNow(key)));
        this.boughtCurrencyAmount.push(this.jsonObj[key].amount)
        this.calculatedWorth.push((await this.api.getNow(key)) * this.jsonObj[key].amount)
      }
    }
  }

  scrollDown() {
    this.content.scrollToPoint(0, 350, 1500);
  }


}
