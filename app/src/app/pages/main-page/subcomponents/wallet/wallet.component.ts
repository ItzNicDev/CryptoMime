import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../../services/cache.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  public walletValue: number = 0;

  constructor(private cache: CacheService) {
  }

  ngOnInit() {

    if (isNaN(parseInt(this.cache.getEncrypted("walletValue")))) {
      this.cache.setEncrypted("5000", "walletValue")
    }
    if (this.cache.get("walletValue") == null) {
      this.cache.setEncrypted("5000", "walletValue")
      this.walletValue = parseInt(this.cache.getEncrypted("walletValue"));
    } else {
      this.walletValue = parseInt(this.cache.getEncrypted("walletValue"));
    }



  }


  refreshWallet() {
    location.reload();
  }

}
