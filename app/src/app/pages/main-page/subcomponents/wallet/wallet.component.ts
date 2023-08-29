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

    if(isNaN(parseInt(this.cache.getEncrypted("walletValue")))) {
      this.cache.setEncrypted("5000","walletValue")
    }



    if (this.cache.get("walletValue") == null) {
      // this.cache.set(5000, "walletValue");
      this.cache.setEncrypted("5000","walletValue")

     this.walletValue = parseInt(this.cache.getEncrypted("walletValue"));

      // this.walletValue = this.cache.getEncrypted("walletValue");

    } else {

      this.walletValue = parseInt(this.cache.getEncrypted("walletValue"));
    }

  }

  subtract() {
    this.walletValue = this.walletValue - 10;
    this.cache.set(this.walletValue,"walletValue")

    // setEncrypted(value: any, key: string) {
    //     const encryptedValue = CryptoJS.AES.encrypt(value, 'test').toString();
    //     localStorage.setItem(key, encryptedValue);
    //   }
  }

  refreshWallet(){
    location.reload();
  }

}
