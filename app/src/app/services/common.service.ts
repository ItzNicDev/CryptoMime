import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  round(value: number, places: number) {
    return value.toFixed()
  }
}
