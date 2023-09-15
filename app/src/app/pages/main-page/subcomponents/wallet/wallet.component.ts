import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../../services/cache.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  public walletValue: number = 0;

  constructor(private nativeRouter: NavController,private router: Router, private cache: CacheService) {
  }

  ngOnInit() {

    if (isNaN(parseInt(this.cache.getEncrypted("walletValue")))) {
      this.cache.setEncrypted("5000", "walletValue")
    }
    if (this.cache.get("walletValue") == null) {
      this.cache.setEncrypted("5000", "walletValue")
      this.walletValue = Math.round((parseFloat(this.cache.getEncrypted("walletValue")) + Number.EPSILON) * 100) / 100
    } else {
      this.walletValue = Math.round((parseFloat(this.cache.getEncrypted("walletValue")) + Number.EPSILON) * 100) / 100
    }


  }

  refreshWallet() {
    location.reload();
  }

  openAchievments() {
    this.router.navigate(["achievement"])
  }

}
