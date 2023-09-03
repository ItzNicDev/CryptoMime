import {Component, OnInit} from '@angular/core';
import {AlertController, PickerController} from "@ionic/angular";
import {ApiService} from "../../../../services/api.service";
import {CacheService} from "../../../../services/cache.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastService} from "../../../../services/toast.service";
import {CheckoutService} from "../../../../services/checkout.service";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  animations: [
    trigger('buttonSwap', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition(':enter, :leave', [
        animate('250ms ease-in-out'),
      ]),
    ]),
  ],
})
export class BuyComponent implements OnInit {
  public selectedOrder: string = "";
  public currency: any;
  public currencyPrice: any;
  private amountOfCoins: number = 0;
  public acceptedPurchase: boolean = false;
  public showIcon: boolean = false;


  constructor(private checkout: CheckoutService, private toast: ToastService, private alertController: AlertController, private pickerCtrl: PickerController, private api: ApiService, private cache: CacheService) {
  }

  ngOnInit() {
  }

  async wheelHandler() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'currencies',
          options: [
            {
              text: 'BitCoin',
              value: 'btc',
            },
            {
              text: 'Ethereum',
              value: 'eth',
            },
            {
              text: 'Binance Coin',
              value: 'bnb',
            },
            {
              text: 'Cardano',
              value: 'ada',
            },
            {
              text: 'Solana',
              value: 'sol',
            },
            {
              text: 'XRP',
              value: 'ada',
            },
            {
              text: 'Polkadot',
              value: 'dot',
            },
            {
              text: 'Dogecoin',
              value: 'doge',
            },
            {
              text: 'Terra',
              value: 'luna',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value: any) => {
            this.selectedOrder = value.currencies.text;
            this.currency = value.currencies.value;
            this.loadCurrencyPrice();
          },
        },
      ],
    });
    await picker.present();
  }

  async loadCurrencyPrice() {
    this.currencyPrice = (await this.api.getNow(this.currency)).toFixed(4);
  }

  async setAmount(amount: any) {
    this.amountOfCoins = amount
    this.currencyPrice = (await this.api.getNow(this.currency) * amount).toFixed(4);
  }

  changeCheckbox(status: boolean) {
    this.acceptedPurchase = !this.acceptedPurchase
  }

  async buyHandler(coinsAmount: any, boughtCoins: number | string | null | undefined) {
    if (parseInt(this.cache.getEncrypted("walletValue")) < this.currencyPrice) {
      const alert = await this.alertController.create({
        header: 'Purchase Failed',
        subHeader: 'Not enough money!',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      if (this.acceptedPurchase) {
        //
        //
        // // let currencyAmount = parseInt(this.cache.get(this.currency)) + parseInt(coinsAmount);
        //
        // //falls noch kein key angelegt wurde wird er hier mit eins
        // if (!this.cache.get(this.currency)) {
        //   this.cache.set(boughtCoins, this.currency)
        // } else {
        //   let currencyAmount = parseInt(this.cache.get(this.currency)) + parseInt(coinsAmount);
        //   this.cache.set(currencyAmount, this.currency)
        //
        //
        // }
        //
        // //falls keine json angelegt ist
        // if (!this.cache.get("json")) {
        //   let currencyAmount: number = parseInt(this.cache.get(this.currency));
        //   let jsonPart = '"' + this.currency + '": { "amount": ' + currencyAmount + '}'
        //   this.cache.set("{" + jsonPart + "}", "json");
        //
        //
        // } else {
        //   let json = this.cache.get("json");
        //   let currencyAmount: number = parseInt(this.cache.get(this.currency));
        //
        //   if (json.includes(this.currency)) {
        //     alert("item schon drinnen!")
        //     let jsonObj = JSON.parse(json);
        //     jsonObj[this.currency].amount = currencyAmount;
        //     let jsonString = JSON.stringify(jsonObj)
        //     this.cache.set(jsonString, "json")
        //
        //   } else {
        //     let json = this.cache.get("json");
        //     let jsonPart = '"' + this.currency + '": { "amount": ' + (currencyAmount) + '}'
        //     this.cache.set(json.replace("}}", "},") + jsonPart + "}", "json");
        //
        //   }
        // }
        //
        //
        // this.cache.setEncrypted((parseInt(this.cache.getEncrypted("walletValue")) - this.currencyPrice).toString(), "walletValue");
        // // this.showIcon = true;
        // // setTimeout(() => {
        // //   this.showIcon = false;
        // // }, 2000);
        //
        // this.toast.presentToast("Purchase Successful", 2500,"success" , "bottom")

        this.checkout.transfer(this.currency, boughtCoins, coinsAmount, this.currencyPrice)

      } else {

        const alert = await this.alertController.create({
          header: 'Failed',
          subHeader: 'You have to check the field "Accept Purchase"',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'secondary'
            }
          ]
        });
        await alert.present();
      }
    }
  }

}
