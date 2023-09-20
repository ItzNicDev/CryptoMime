import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {CacheService} from "../../services/cache.service";
import {CheckoutService} from "../../services/checkout.service";
import {CheckoutBuyComponent} from "../checkout-buy/checkout-buy.component";
import {WalletComponent} from "../main-page/subcomponents/wallet/wallet.component";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {


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


  constructor(private api: ApiService, private router: Router, private cache: CacheService) {
  }

  async ngOnInit() {

    for (const item of this.items) {
      item.high = await this.api.getHigh(item.short);
      item.low = await this.api.getLow(item.short);
      item.now = await this.api.getNow(item.short);
    }
  }


  clickOnCard() {
    // alert("info to currency")
  }

  handleRefresh() {
    setTimeout(() => {
      location.reload();
      // this.router.navigate(["marketplace"])
    }, 500);

  }




  checkoutBuy(currency: string) {

    this.cache.set(currency,"checkoutOrder")
    this.router.navigate(["checkout"]);


  }

  checkoutSell(currency: string) {
    this.cache.set(currency,"checkoutOrder")
    this.router.navigate(["checkout"]);
  }

}
