import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {RankingsComponent} from "./pages/rankings/rankings.component";
import {MarketplaceComponent} from "./pages/marketplace/marketplace.component";
import {CheckoutBuyComponent} from "./pages/checkout-buy/checkout-buy.component";
import {MinerComponent} from "./pages/miner/miner.component";
import {AchievementsComponent} from "./pages/achievements/achievements.component";

const routes: Routes = [
  // {path: "", component: MainPageComponent},
  {path: "wallet", component: MainPageComponent},
  {path: "achievement", component: AchievementsComponent},
  {path: "marketplace", component: MarketplaceComponent},
  {path: "rankings", component: RankingsComponent},
  {path: "miner", component: MinerComponent},
  {path: "checkout", component: CheckoutBuyComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
