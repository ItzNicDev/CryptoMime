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

  transferBuy(currency: string, coinsAmount: any, currencyPrice: number) {
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
    this.toast.presentToast("Transaction was Successful!", 1000, "success", "bottom", "checkmark")

  }


  transferSell(currency: string, amount: any, currencyPrice: number) {

    this.cache.set((this.cache.get(currency) - amount).toString(), currency)
    let jsonString = this.cache.get("json");
    var jsonObject = JSON.parse(jsonString);
    jsonObject[currency].amount = jsonObject[currency].amount - amount;

    var updatedJsonString = JSON.stringify(jsonObject);

    this.cache.set(updatedJsonString, "json");
    if (parseFloat(this.cache.get(currency)) <= 0) {
      this.cache.remove(currency);
      delete jsonObject[currency];
      console.log(jsonObject);
      this.cache.set(JSON.stringify(jsonObject).replace("{}", ""), "json")
    }

    this.cache.setEncrypted((parseFloat(this.cache.getEncrypted("walletValue")) + currencyPrice).toString(), "walletValue");
    this.toast.presentToast("Successfuly Sold Currency", 1000, "danger", "bottom", "checkmark")
  }

  getFees() {
    let now = new Date();
    let mapped = this.mapValue(now.getUTCHours(), 0, 24, 0, 1);
    return Math.round((mapped * 100)) / 100;
  }

  formatCurrency(value: string): string {
    switch (value) {
      case "btc": {
        return "Bitcoin";
        break;
      }
      case "eth": {
        return "Ethereum";
        break;
      }
      case "bnb": {
        return "Binance Coin";
        break;
      }
      case "ada": {
        return "Cardano";
        break;
      }
      case "sol": {
        return "Solana";
        break;
      }
      case "xrp": {
        return "XRP";
        break;
      }
      case "dot": {
        return "Polkadot";
        break;
      }
      case "doge": {
        return "Dogecoin";
        break;
      }
      case "luna": {
        return "Terra";
        break;
      }
      default: {
        return "";
        break;
      }
    }

  }



  mapValue(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number): number {
    input = Math.max(inputMin, Math.min(input, inputMax));
    const inputRatio = (input - inputMin) / (inputMax - inputMin);
    const output: number = outputMin + inputRatio * (outputMax - outputMin);
    return output;
  }


}
