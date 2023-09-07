import {Injectable} from '@angular/core';
import {Storage} from '@capacitor/storage';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  async setData(data: any, key: any): Promise<void> {
    try {
      await Storage.set({key: key, value: CryptoJS.AES.encrypt(data, this.encryptionKey).toString()});
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  }

  async getData(key: any): Promise<any> {
    try {
      const ret = await Storage.get({key: key});
      // @ts-ignore
      return CryptoJS.AES.decrypt(ret.value, this.encryptionKey).toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  private readonly encryptionKey: any = "db27a711a27186b18c10be5581516e24";

}
