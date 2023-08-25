import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {WalletComponent} from "./pages/main-page/subcomponents/wallet/wallet.component";
import {HeaderComponent} from "./pages/main-page/subcomponents/header/header.component";
import{ProfileComponent} from "./pages/profile/profile.component";

@NgModule({
  declarations: [AppComponent, MainPageComponent, WalletComponent, HeaderComponent, ProfileComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
