import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

//const apiUrl = "https://www.just4u.co.il/api/Gifts/";
const apiUrl = "/api/Gifts/" //- for Testing purposes;
//const apiUrl = "../api/Gifts/";
const headers = new HttpHeaders({'Content-Type': 'application/json'});

export interface LinkedOrder {
  orderId: string,
  title?: string,
  greeting?: string,
  image?: string,
  addonItems: number[],
  goToDelivery: number,
  noCodeProducts?: number[],
  noCodeNote?: string,
  autoChoose?: number,
  autoChooseNoCodeNote?: string,
  info: any,
  items?: any[],
  history?: any[],
  [key: string]: any
}

export interface Product {
  id: number,
  name: string,
  mail: number,
  pickUp: number,
  notes: string,
  credit?: number,
  options?: any[],
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  allOrders: any;
  allProducts: any;
  linkedOrders: LinkedOrder[];
  lockedOrderIndex: number = -1;
  choseOrderIndex: number = -1;
  ids: any = {
    OrderId: 0,
    ValidationField: 0
  };
  order = new BehaviorSubject<any>(new Object());
  product = new BehaviorSubject<Product>(null);
  employee = new BehaviorSubject<any>(new Object());
  
  constructor(private http: HttpClient, private router: Router) { }

  getLinkedOrdersList() {
    return this.http.get('./assets/orders.json');
  }

  getProducts() {
    return this.http.get('./assets/products.json');
  }

  getBaldarSites() {
    return this.http.get('./assets/baldarsites.min.json');
  }

  getOrder(id: string) {
    this.http.get(apiUrl + 'GetOrderInfo?EncOrder=' + id).subscribe((data: any) => {
      this.order.next(data.response[0]);
    }, () => this.routeTo404());
  }

  getOrderHeader(id: string) {
    return this.http.get(apiUrl + 'GetOrderInfo?EncOrder=' + id);
  }

  validateEmployee(employee: JSON) {
    return this.http.post(apiUrl + 'Validate', employee, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  doChoice(choice: JSON) {
    return this.http.post(apiUrl + 'DoChoose', choice, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  validationString(i: number): string {
    return this.ids.ValidationField.substring(0,1) + '-' + (i + 1) + '-' + this.ids.ValidationField.substring(1);
  }

  submitDelivery(recipient: string, phone: string, street: string = '', streetNum: string = '', aptnum: string = '', floor: string = '', city: string = '', notes: string = '') {
    const sendJSON = {
      VCVoucherid: this.order.value.id + this.ids.ValidationField,
      Package: this.product.value.name,
      SendName: '',
      SendPhone: '',
      ReceiveName: recipient,
      ReceivePhone: phone,
      ReceiveAddress: street + ' ' + streetNum + ', ' + (aptnum ? (floor ? 'קומה: ' + floor + ', ' : '') + 'דירה: ' + aptnum + ', ' : '') + city,
      Notes: notes,
      Greeting: '',
      UserId: this.product.value.id || 0,
      SendMail: this.product.value.mail ? true : false
    };
    return this.http.post('/api/External/InsertExternal', sendJSON);
  }

  sendCode(details: JSON) {
    return this.http.post(apiUrl + 'Push', details, {headers: headers}).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('אירעה שגיאה');
  }

  checkValidation() {
    if (!this.ids.OrderId || !this.ids.ValidationField) {
      this.routeTo('');
      return false;
    }
    return true;
  }

  routeTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: "preserve" });
  }

  routeTo404() {
    location.href = 'https://www.just4u.co.il/PageNotFound404.aspx';
  }
}
