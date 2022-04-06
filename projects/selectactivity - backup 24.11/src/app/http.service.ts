import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiUrl = "/Api/TeamBuild/";
// const apiUrl = "/api/"; //test
const headers = new HttpHeaders({'Content-Type': 'application/json'});
const SMSheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  ids: any = {
    PackageId: 0,
    ValidationField: 0
  };
  worksWithApprover = false;
  pkgHeader = new BehaviorSubject(null);
  employee = new BehaviorSubject<any>(null);
  activity = new BehaviorSubject<any>(new Object());
  
  constructor(private http: HttpClient, private router: Router) { }
  
  getPackageHeader(id: string) {
    this.http.post(apiUrl + 'GetTeamBuildPackageHeader', {PackageId: id} ,{headers: headers}).subscribe((data: any) => {
      this.pkgHeader.next(data.response[0]);
    }, () => this.routeTo404());
  }

  validateEmployee(employee: JSON) {
    return this.http.post(apiUrl + 'validate', employee, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  getPackage() {
    return this.http.post(apiUrl + 'GetTeamBuildPkg', <JSON>this.ids, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  doChoice(choice: JSON) {
    return this.http.post(apiUrl + 'DoChoose', choice, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  updateUser(participants: string, preferredDate: string, notes: string) {
    let params = {
      PackageId: this.ids.PackageId,
      ValidationField: this.ids.ValidationField,
      Participants: participants,
      PreferredDate: preferredDate,
      Notes: notes
    }
    return this.http.post(apiUrl + 'UpdateUser', params);
  }

  sendCode(details: JSON) {
    return this.http.post(apiUrl + 'Push', details, {headers: headers}).pipe(catchError(this.handleError));
  }

  sendSMS(name: string, itemId: number, itemName: string, voucher: string, phone: string) {
    let smsParams = new HttpParams({
      fromObject: {
        UserName: 'justforu',
        EncryptPassword: '659cc2b8b03141278286acd850be1a2b',
        Subscribers: phone,
        Message: `${name},
קיבלת במתנה שובר: ${itemName}
קוד שובר: ${voucher}
מקומות מכבדים: https://www.just4u.co.il/coupon/${itemId}
יש להציג לבית העסק את קוד השובר.
תודה, דור חדש בשוברים.
לשירותך בכל צורך: 03-5322313 שלוחה 1.`,
        SenderName: 'Just4u',
        DeliveryDelayInMinutes: '0',
        ExpirationDelayInMinutes: '0',
        SendId: ''
      }
    });
    return this.http.post('/ext-api/tm/' + 'SendSms', smsParams, { headers: SMSheaders, responseType: 'text' });
  }

  /*getItem(item: number) {
    return this.http.get('https://www.justforu.co.il/api/NewApi/getItem/' + item);
  }*/

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

  routeTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: 'preserve' });
  }

  routeTo404() {
    location.href = 'https://www.justforu.co.il/PageNotFound404.aspx';
  }
}
