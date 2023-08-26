import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(url);
  }


  async getStock(currency: string): Promise<any> {
    const response: any = await this.http.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=" + currency + "&tsym=USD&limit=23")
      .toPromise();

    console.log(response.Data.Data);

    // return response.prices[0][1].toFixed(4);

  }

  async getHigh(currency: any) {
    const response: any = await this.http.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=" + currency + "&tsym=USD&limit=1")
      .toPromise();
    return response.Data.Data[0].high;
  }

  async getLow(currency: any) {
    const response: any = await this.http.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=" + currency + "&tsym=USD&limit=1")
      .toPromise();
    return response.Data.Data[0].low;
  }

  async getNow(currency: any) {
    const response: any = await this.http.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=" + currency + "&tsym=USD&limit=1")
      .toPromise();
    return response.Data.Data[0].close;
  }

}
