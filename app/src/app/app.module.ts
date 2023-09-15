import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {WalletComponent} from "./pages/main-page/subcomponents/wallet/wallet.component";
import {HeaderComponent} from "./pages/main-page/subcomponents/header/header.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MarketplaceComponent} from "./pages/marketplace/marketplace.component";
import {RankingsComponent} from "./pages/rankings/rankings.component";
import {AchievementsComponent} from "./pages/achievements/achievements.component";
import {HttpClientModule} from "@angular/common/http";
import {CheckoutBuyComponent} from "./pages/checkout-buy/checkout-buy.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MinerComponent} from "./pages/miner/miner.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {BuyComponent} from "./pages/checkout-buy/subcomponents/buy/buy.component";
import {SellComponent} from "./pages/checkout-buy/subcomponents/sell/sell.component";
import {NetworkPlugin} from "@capacitor/network/dist/esm/definitions";
import {NetworkerrorComponent} from "./pages/networkerror/networkerror.component";

@NgModule({
  declarations: [AppComponent, MainPageComponent, WalletComponent, HeaderComponent, ProfileComponent, WalletComponent, MarketplaceComponent, RankingsComponent, AchievementsComponent, CheckoutBuyComponent, MinerComponent, NavbarComponent, BuyComponent, SellComponent, NetworkerrorComponent],
  imports: [BrowserAnimationsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
