import {Component, Injectable, OnInit} from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {CheckoutService} from "../../services/checkout.service";
import {Subscription} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AlertController, NavController, PickerController} from "@ionic/angular";
import {ApiService} from "../../services/api.service";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-checkout-buy',
  templateUrl: './checkout-buy.component.html',
  styleUrls: ['./checkout-buy.component.scss'],

  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition(':enter, :leave', [
        animate('250ms ease-in-out'),
      ]),
    ]),

    trigger('buttonSwap', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition(':enter, :leave', [
        animate('750ms ease-in-out'),
      ]),
    ]),

  ],
})


@Injectable({
  providedIn: 'root',
})
export class CheckoutBuyComponent implements OnInit, CanActivate {
  public currency: any;
  public currencyPrice: any;
  public acceptedPurchase: boolean = false;
  public items: any[] = [
    {
      name: 'Bitcoin',
      short: 'btc',
      description: 'The first cryptocurrency, often referred to as digital gold.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Ethereum',
      short: 'eth',
      description: 'Known for smart contracts, enabling decentralized applications (DApps).',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Binance Coin',
      short: 'bnb',
      description: 'Initially from Binance exchange, used within Binance ecosystem.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Cardano',
      short: 'ada',
      description: 'Focuses on scalability, sustainability, and a secure ecosystem.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Solana',
      short: 'sol',
      description: 'High-performance blockchain for decentralized applications.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'XRP',
      short: 'xrp',
      description: 'Created by Ripple for fast, low-cost cross-border transactions.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Polkadot',
      short: 'dot',
      description: 'Enables different blockchains to exchange messages and value trustlessly.',
      high: null,
      low: null,
      now: null
    },
    {
      name: 'Dogecoin',
      short: 'doge',
      description: 'Started as a joke, gained popularity and active community.',
      high: null,
      low: null,
      now: null
    },

    {
      name: 'Terra',
      short: 'luna',
      description: 'Terra (LUNA) is a platform for stable cryptocurrencies and fast cross-border payments.',
      high: null,
      low: null,
      now: null
    },

  ];
  public selectedOrder: string = "";
  public money: number = 0;
  public showIcon: boolean = false;
  private amountOfCoins: number = 0;
  //abhängig davon wird entweder buy oder sell card angezeigt!
  public activeCheckout: string = "buy";

  constructor(private alertController: AlertController, private cache: CacheService, private checkout: CheckoutService, private pickerCtrl: PickerController, private api: ApiService) {
  }

  ngOnInit() {
    this.selectedOrder = this.cache.get("checkoutOrder");
    this.money = this.cache.get("walletValue")
  }

  segmentHandler(segmentValue: any) {
    console.log(segmentValue)
    this.activeCheckout = segmentValue;
  }

  /**
   * Handles opening and closing of Wheel-Selector.
   */
  async wheelHandler() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'languages',
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
            this.selectedOrder = value.languages.text;
            this.currency = value.languages.value;
            this.loadCurrencyPrice();
          },
        },
      ],
    });
    await picker.present();
  }

  async setAmount(amount: any) {
    this.amountOfCoins = amount
    this.currencyPrice = (await this.api.getNow(this.currency) * amount).toFixed(4);
  }

  /**
   * Handles checkbox for "Accept Purchase"
   */
  changeCheckbox(status: boolean) {
    this.acceptedPurchase = !this.acceptedPurchase
  }

  /**
   * Handles Currency-Price and your actual Money and books it off
   */
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
        let currencyAmount = parseInt(this.cache.get(this.currency)) + parseInt(coinsAmount);

        //falls noch kein key angelegt wurde wird er hier mit eins
        if (!this.cache.get(this.currency)) {
          this.cache.set(boughtCoins, this.currency)
        } else {
          let currencyAmount = parseInt(this.cache.get(this.currency)) + parseInt(coinsAmount);
          this.cache.set(currencyAmount, this.currency)


        }

        //falls keine json angelegt ist
        if (!this.cache.get("json")) {
          let currencyAmount: number = parseInt(this.cache.get(this.currency));
          let jsonPart = '"' + this.currency + '": { "amount": ' + currencyAmount + '}'
          this.cache.set("{" + jsonPart + "}", "json");


        } else {
          let json = this.cache.get("json");
          let currencyAmount: number = parseInt(this.cache.get(this.currency));

          if (json.includes(this.currency)) {
            alert("item schon drinnen!")
            let jsonObj = JSON.parse(json);
            jsonObj[this.currency].amount = currencyAmount;
            let jsonString = JSON.stringify(jsonObj)
            this.cache.set(jsonString, "json")


          } else {
            let json = this.cache.get("json");
            let jsonPart = '"' + this.currency + '": { "amount": ' + (currencyAmount) + '}'
            this.cache.set(json.replace("}}", "},") + jsonPart + "}", "json");

          }

        }




        this.cache.setEncrypted((parseInt(this.cache.getEncrypted("walletValue")) - this.currencyPrice).toString(), "walletValue");
        this.showIcon = true;
        setTimeout(() => {
          this.showIcon = false;
        }, 2000);
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




  /**
   * Loads the current currency price when a currency is selected.
   */
  async loadCurrencyPrice() {
    this.currencyPrice = (await this.api.getNow(this.currency)).toFixed(4);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.setOrder(this.cache.get("checkoutOrder"))
    return true
  }

  setOrder(order: string) {
    console.log(order)
    this.selectedOrder = order;
  }


}
