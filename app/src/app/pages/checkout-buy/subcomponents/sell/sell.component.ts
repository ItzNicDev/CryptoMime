import {Component, OnInit} from '@angular/core';
import {AlertController, PickerController, PickerOptions} from "@ionic/angular";
import {ApiService} from "../../../../services/api.service";
import {CacheService} from "../../../../services/cache.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {empty} from "rxjs";
import {ToastService} from "../../../../services/toast.service";
import {CheckoutService} from "../../../../services/checkout.service";
import {alarm, alert} from "ionicons/icons";
import {AlertService} from "../../../../services/alert.service";

// import {createSecureContext} from "tls";

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
  animations: [
    trigger('buttonSwap', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition(':enter, :leave', [
        animate('400ms ease-in-out'),
      ]),
    ]),
  ],
})
export class SellComponent implements OnInit {
  public selectedOrder: string = "";
  public currency: any;
  public currencyPrice: any = 0;
  private amountOfCoins: number = 0;
  public acceptedPurchase: boolean = false;
  public showIcon: boolean = false;
  public currencyPriceWithFees: number = 0;

  public jsonObj: any = null;
  public keys: any = null;

  public boughtCurrencyList: string[] = [];
  public boughtCurrencyPrices: any[] = [];
  public boughtCurrencyAmount: number[] = [];
  public feeNow: number = 0;

  public accountBalance: number = 0;

  public calculatedWorth: number[] = [];


  constructor(private alert:AlertService ,private checkout: CheckoutService, private alertController: AlertController, private pickerCtrl: PickerController, private api: ApiService, private cache: CacheService, private toast: ToastService) {
  }

  async ngOnInit() {

    this.feeNow = this.checkout.getFees();
    this.accountBalance = Math.round((parseFloat(this.cache.getEncrypted("walletValue")) + this.currencyPriceWithFees + Number.EPSILON) * 1000) / 1000

    //sofern es die json gibt!
    if (this.cache.get("json")) {
      this.jsonObj = JSON.parse(this.cache.get("json"))
      for (const key in this.jsonObj) {
        this.boughtCurrencyList.push(key)
        this.boughtCurrencyPrices.push((await this.api.getNow(key)));
        this.boughtCurrencyAmount.push(this.jsonObj[key].amount)
        this.calculatedWorth.push((await this.api.getNow(key)) * this.jsonObj[key].amount)
      }
    }
    console.log(this.boughtCurrencyList)
  }

  async wheelHandler() {
    if (this.boughtCurrencyList.length != 0) {
      let wheelJson: PickerOptions = {
        columns: [
          {
            name: 'languages',
            options: this.boughtCurrencyList.map((value) => ({
              text: this.checkout.formatCurrency(value) + " (" + this.cache.get(value) + " pcs.)",
              value: value,
            })),
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
              // You can access the selected values as follows:
              this.selectedOrder = value.languages.text;
              this.currency = value.languages.value;
              this.loadCurrencyPrice();
            },
          },
        ],
      };
      const picker = await this.pickerCtrl.create(wheelJson);
      await picker.present();
    } else {
      this.toast.presentToast("You don´t own any coins!", 1500, "danger", "bottom", "alert-outline")
    }
  }

  async loadCurrencyPrice() {
    this.currencyPrice = (await this.api.getNow(this.currency)).toFixed(4)
    this.currencyPriceWithFees = Math.round((parseFloat(this.currencyPrice) - (parseFloat(this.currencyPrice) * this.feeNow) / 100 + Number.EPSILON) * 10000) / 10000
    this.accountBalance = Math.round((parseFloat(this.cache.getEncrypted("walletValue")) + this.currencyPriceWithFees + Number.EPSILON) * 1000) / 1000

  }

  async setAmount(amount: any) {
    this.amountOfCoins = amount
    this.currencyPrice = (await this.api.getNow(this.currency) * amount).toFixed(4);
    this.currencyPriceWithFees = Math.round((parseFloat(this.currencyPrice) - (parseFloat(this.currencyPrice) * this.feeNow) / 100 + Number.EPSILON) * 10000) / 10000

    this.accountBalance = Math.round((parseFloat(this.cache.getEncrypted("walletValue")) + this.currencyPriceWithFees + Number.EPSILON) * 1000) / 1000

    console.log(amount)
  }


  showInfo() {
    this.alert.showOk(this.feeNow + "% Fee?", "Covers transaction, processing and network maintenance costs for secure and efficient blockchain transactions! (changes every hour)")
  }

  /**
   * Handles checkbox for "Accept Purchase"
   */
  changeCheckbox(status: boolean) {
    this.acceptedPurchase = !this.acceptedPurchase
  }

  async sellHandler(coinsAmount: any) {


    if (!this.acceptedPurchase) {
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
    if (this.acceptedPurchase) {
      console.log("coinsAmount: " + coinsAmount + "  cache: " + this.cache.get(this.currency))

      if (coinsAmount > parseFloat(this.cache.get(this.currency))) {
        const alert = await this.alertController.create({
          header: 'Ups',
          subHeader: 'You Don not own that many Coins!',
          buttons: ['OK'],
        });
        await alert.present();
      } else {

        this.checkout.transferSell(this.currency, coinsAmount, this.currencyPriceWithFees)


      }
    }


  }
}
