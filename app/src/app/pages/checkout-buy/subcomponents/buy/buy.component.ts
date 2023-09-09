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
  public currencyPrice: any = 0;
  public currencyPriceWithFees: number = 0;
  private amountOfCoins: number = 0;
  public acceptedPurchase: boolean = false;
  public showIcon: boolean = false;
  public feeNow: number = 0;

  constructor(private checkout: CheckoutService, private toast: ToastService, private alertController: AlertController, private pickerCtrl: PickerController, private api: ApiService, private cache: CacheService) {
  }

  ngOnInit() {
    this.checkout.getFees();
    this.feeNow = this.checkout.getFees();
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
              value: 'xrp',
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
    // this.currencyPriceWithFees = this.currencyPrice + (this.currencyPriceWithFees * this.feeNow) / 100;
    this.currencyPriceWithFees = Math.round((parseFloat(this.currencyPrice) + (parseFloat(this.currencyPrice) * this.feeNow) / 100 + Number.EPSILON) * 10000) / 10000


  }

  async setAmount(amount: any) {
    this.amountOfCoins = amount
    this.currencyPrice = (await this.api.getNow(this.currency) * amount).toFixed(4);
    this.currencyPriceWithFees = (Math.round((parseFloat(this.currencyPrice) + (parseFloat(this.currencyPrice) * this.feeNow) / 100 + Number.EPSILON) * 10000) / 10000);


    // this.currencyPriceWithFees = this.currencyPrice + (this.currencyPriceWithFees * this.feeNow) / 100;
  }

  changeCheckbox(status: boolean) {
    this.acceptedPurchase = !this.acceptedPurchase
  }

  async buyHandler(coinsAmount: any) {
    if (parseInt(this.cache.getEncrypted("walletValue")) < this.currencyPriceWithFees) {
      const alert = await this.alertController.create({
        header: 'Purchase Failed',
        subHeader: 'Not enough money!',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      if (this.acceptedPurchase) {

        this.checkout.transfer(this.currency, coinsAmount, this.currencyPriceWithFees)


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
