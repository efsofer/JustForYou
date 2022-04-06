import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const apiUrl = "https://www.just4u.co.il/api/Gifts/";
const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  ids: any = {
    OrderId: 0,
    ValidationField: 0
  };
  order = new BehaviorSubject(new Object());
  employee = new BehaviorSubject<any>(new Object());
  choice = new BehaviorSubject<any>(new Object());
  
  constructor(private http: HttpClient) { }
  
  getOrder(id: string) {
    this.http.get(apiUrl + 'GetOrderInfo?EncOrder=' + id).subscribe((data: any) => {
      this.order.next(data.response[0]);
    }, () => this.routeTo404());
  }

  validateEmployee(employee: JSON) {
    return this.http.get('assets/response.json');
    return this.http.post(apiUrl + 'Validate', employee, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  doChoice(choice: JSON) {
    //return this.http.get('assets/response1.json');
    return this.http.post(apiUrl + 'DoChoose', choice, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  sendCode(details: JSON) {
    return this.http.post(apiUrl + 'Push', details, {headers: headers}).pipe(catchError(this.handleError));
  }

  getItem(item: number) {
    return this.http.get('https://www.just4u.co.il/api/NewApi/getItem/' + item);
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

  routeTo404() {
    location.href = 'https://www.just4u.co.il/PageNotFound404.aspx';
  }
}
