import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {

  constructor(private router: Router, private cache: CacheService) {
  }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(["wallet"])
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  cheat() {
    this.cache.setEncrypted((Math.random() * (100000 - 1) + 1).toString(), "walletValue");

  }
}
