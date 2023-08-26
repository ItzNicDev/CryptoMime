import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-checkout-buy',
  templateUrl: './checkout-buy.component.html',
  styleUrls: ['./checkout-buy.component.scss'],
})
export class CheckoutBuyComponent implements OnInit {

  constructor(private cache: CacheService) {
    this.order = this.cache.get("inOrder")

  }

  public order: any;

  ngOnInit() {
    this.order = this.cache.get("inOrder")
  }

}
