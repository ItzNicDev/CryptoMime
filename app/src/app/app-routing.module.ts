import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {RankingsComponent} from "./pages/rankings/rankings.component";
import {AchievementsComponent} from "./pages/achievements/achievements.component";
import {MarketplaceComponent} from "./pages/marketplace/marketplace.component";
import {CheckoutBuyComponent} from "./pages/checkout-buy/checkout-buy.component";
const routes: Routes = [
  {path: "", component:MainPageComponent},
  {path: "wallet", component:MainPageComponent},
  {path: "user", component:MarketplaceComponent},
  {path: "rankings", component:RankingsComponent},
  {path: "achievements", component:AchievementsComponent},
  {path: "checkout/buy", component: CheckoutBuyComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
