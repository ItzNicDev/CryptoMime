import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-networkerror',
  templateUrl: './networkerror.component.html',
  styleUrls: ['./networkerror.component.scss'],
})
export class NetworkerrorComponent implements OnInit {
  public showSpinner: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }


  retrySwipe() {
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  retryPress() {
    setTimeout(() => {
      location.reload();
      this.showSpinner = false;
    }, 500);
    this.showSpinner = true;
  }

}
