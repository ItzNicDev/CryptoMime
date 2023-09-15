import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import {StorageService} from "./services/storage.service";
import {Network} from '@capacitor/network';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  public hasInternet: boolean = false;

  constructor(private api: ApiService, private storage: StorageService, private router: Router) {
  }


  async ngOnInit() {
    this.hasInternet = (await Network.getStatus()).connected;

    if (this.hasInternet) {
      this.router.navigate(["wallet"])

    }


  }

}
