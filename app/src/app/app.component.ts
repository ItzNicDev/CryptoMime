import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private api: ApiService) {}


  async ngOnInit() {

 console.log(await this.api.getHigh("btc"));
    console.log(await this.api.getLow("btc"));

  }

}
