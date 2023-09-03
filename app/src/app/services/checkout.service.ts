import {EventEmitter, Injectable} from '@angular/core';
import {CacheService} from "./cache.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  constructor(private cache: CacheService, private toast: ToastService) {
  }

  transfer(currency: string, boughtCoins: any, coinsAmount: any, currencyPrice:number ) {


    // let currencyAmount = parseFloat(this.cache.get(this.currency)) + parseFloat(coinsAmount);

    //falls noch kein key angelegt wurde wird er hier mit eins
    if (!this.cache.get(currency)) {
      this.cache.set(boughtCoins, currency)
    } else {
      let currencyAmount = parseFloat(this.cache.get(currency)) + parseFloat(coinsAmount);
      this.cache.set(currencyAmount, currency)


    }

    //falls keine json angelegt ist
    if (!this.cache.get("json")) {
      let currencyAmount: number = parseFloat(this.cache.get(currency));
      let jsonPart = '"' + currency + '": { "amount": ' + currencyAmount + '}'
      this.cache.set("{" + jsonPart + "}", "json");


    } else {
      let json = this.cache.get("json");
      let currencyAmount: number = parseFloat(this.cache.get(currency));

      if (json.includes(currency)) {
        alert("item schon drinnen!")
        let jsonObj = JSON.parse(json);
        jsonObj[currency].amount = currencyAmount;
        let jsonString = JSON.stringify(jsonObj)
        this.cache.set(jsonString, "json")

      } else {
        let json = this.cache.get("json");
        let jsonPart = '"' + currency + '": { "amount": ' + (currencyAmount) + '}'
        this.cache.set(json.replace("}}", "},") + jsonPart + "}", "json");

      }
    }


    this.cache.setEncrypted((parseFloat(this.cache.getEncrypted("walletValue")) - currencyPrice).toString(), "walletValue");
    // this.showIcon = true;
    // setTimeout(() => {
    //   this.showIcon = false;
    // }, 2000);

    this.toast.presentToast("Purchase Successful", 2500,"success" , "bottom")

  }


}
