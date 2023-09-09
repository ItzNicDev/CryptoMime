import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {CacheService} from "./cache.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit {


  constructor(private cache: CacheService, private toast: ToastService) {
  }


  ngOnInit() {
  }

  transfer(currency: string, coinsAmount: any, currencyPrice: number) {
    if (!this.cache.get(currency)) {
      this.cache.set(coinsAmount, currency)
    } else {
      let currencyAmount = parseFloat(this.cache.get(currency)) + parseFloat(coinsAmount);
      this.cache.set(currencyAmount, currency)
    }

    if (!this.cache.get("json")) {
      let currencyAmount: number = parseFloat(this.cache.get(currency));
      let jsonPart = '"' + currency + '": { "amount": ' + currencyAmount + '}'
      this.cache.set("{" + jsonPart + "}", "json");

    } else {
      let json = this.cache.get("json");
      let currencyAmount: number = parseFloat(this.cache.get(currency));

      if (json.includes(currency)) {
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
    this.toast.presentToast("Purchase Successful", 2500, "success", "bottom")

  }

  getFees() {
    let now = new Date();
    let mapped = this.mapValue(now.getUTCHours(), 0, 100, 0, 5)
    return Math.round((mapped * 100)) / 100;
  }

  mapValue(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number): number {
    input = Math.max(inputMin, Math.min(input, inputMax));
    const inputRatio = (input - inputMin) / (inputMax - inputMin);
    const output: number = outputMin + inputRatio * (outputMax - outputMin);
    return output;
  }


}
