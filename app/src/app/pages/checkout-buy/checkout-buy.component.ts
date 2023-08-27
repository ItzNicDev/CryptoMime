import {Component, Injectable, OnInit} from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {CheckoutService} from "../../services/checkout.service";
import {Subscription} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {NavController, PickerController} from "@ionic/angular";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-checkout-buy',
  templateUrl: './checkout-buy.component.html',
  styleUrls: ['./checkout-buy.component.scss'],
})

@Injectable({
  providedIn: 'root',
})
export class CheckoutBuyComponent implements OnInit, CanActivate {


  constructor(private cache: CacheService, private checkout: CheckoutService, private pickerCtrl: PickerController, private api: ApiService) {
  }


  async openPicker() {
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

  public currency: any;
  public currencyPrice: any;

  setAmount(amount: any) {
    this.currencyPrice = this.currencyPrice * amount;
  }


  async loadCurrencyPrice() {
    this.currencyPrice = await this.api.getNow(this.currency)
  }


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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.setOrder(this.cache.get("checkoutOrder"))
    return true
  }

  setOrder(order: string) {
    console.log(order)
    this.selectedOrder = order;
  }


  ngOnInit() {
    this.selectedOrder = this.cache.get("checkoutOrder");

  }


}
