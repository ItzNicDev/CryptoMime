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
export class CheckoutBuyComponent implements OnInit {
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

  async setAmount(amount: any) {
    this.amountOfCoins = amount
    this.currencyPrice = (await this.api.getNow(this.currency) * amount).toFixed(4);
  }

  /**
   * Loads the current currency price when a currency is selected.
   */
  async loadCurrencyPrice() {
    this.currencyPrice = (await this.api.getNow(this.currency)).toFixed(4);
  }




}
