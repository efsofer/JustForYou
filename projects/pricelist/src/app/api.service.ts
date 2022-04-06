import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPriceList(id: string) {
    return this.http.get('https://www.just4u.co.il/Api/coupon/GetItemPriceList?Id=' + id);
  }

  routeTo404() {
    location.href = 'https://www.just4u.co.il/404';
  }
}