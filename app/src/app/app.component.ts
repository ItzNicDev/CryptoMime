import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService, private storage: StorageService) {
  }


  async ngOnInit() {

    // await this.storage.setData("hello world", "test");

    // console.log(await this.storage.getData("test"));

  }

}
