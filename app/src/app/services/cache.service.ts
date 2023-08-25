import {Injectable} from '@angular/core';
import {style} from "@angular/animations";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  set(value: any, key: string, ) {
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }


  setEncrypted(value: any, key: string) {
    const encryptedValue = CryptoJS.AES.encrypt(value, 'test').toString();
    localStorage.setItem(key, encryptedValue);
  }

  getEncrypted(key: string): string {
    const encryptedValue: any = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, 'test');
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    }
    return '';
  }

}
