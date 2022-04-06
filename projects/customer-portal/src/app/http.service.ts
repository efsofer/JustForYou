import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// const APIURL = 'https://www.just4u.co.il';
// const APIURL = 'https://test.justforu.co.il';
const APIURL = '';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token: string = localStorage.getItem('j4u_hrtoken') ? localStorage.getItem('j4u_hrtoken') : '';
  username: string = localStorage.getItem('hrstuff') ? JSON.parse(localStorage.getItem('hrstuff')).username : '';
  password: string = localStorage.getItem('hrstuff') ? JSON.parse(localStorage.getItem('hrstuff')).password : '';
  dealerId: number = localStorage.getItem('hrstuff') ? parseInt(JSON.parse(localStorage.getItem('hrstuff')).id) : 0;
  activityId: any = ''
  orderid: any = '';
  activities: any = '';
  sumActivities: any = '';
  vouchers: any = '';
  sumVouchers: any = '';
  haveActivities: boolean = false;
  haveVouchers: boolean = false;
  custs: any = '';
  haveCusts: boolean = false;
  sumCusts: any = '';
  // id:any;
  constructor(private http: HttpClient, private router: Router) { }

  login() {
    /*let params = {
      Mail: this.username,
      Password: this.password
    }
    return this.http.post(APIURL + 'LoginDealer', params);*/
    return this.http.post(APIURL + '/Api/connections/Login?mail=' + this.username + '&password=' + this.password, {});
  }

  updateToken(newToken: string) {
    this.token = newToken;
  }

  updateReqToken(request: HttpRequest<any>) {
    const newToken = { Token: this.token };
    return request.clone({ body: { ...request.body, ...newToken } });
  }

  logout() {
    this.token = '';
    this.username = '';
    this.password = '';
    this.dealerId = 0;
    localStorage.removeItem('j4u_hrtoken');
    localStorage.removeItem('hrstuff');
    localStorage.removeItem('hr_lastLogin');
    localStorage.removeItem('FName');
    this.router.navigate((['login']));
  }

  getCusts(reason = '', name: string = '', phone: string = '', email: string = '', tz: string = '', code: string = '',
    dateFrom: Date = null, dateTo: Date = null) {
    let params = {
      Token: this.token,
      ItemId: "",
      LoadSum: 0,
      ActivityId: 0,
      ChooseGift: false,
      OnlyPast: "",
      OnlyFuture: "",
      SendReason: reason,
      Name: name,
      Phone: phone,
      Email: email,
      TZ: tz,
      WorkerNo: "",
      Department: "",
      VoucherId: code,
      SendDateFrom: this.formatDate(dateFrom),
      SendDateTo: this.formatDate(dateTo),
      SortBy: "name",
      Page: "",
      ResultsPerPage: "",
      ApproverEmail: "",
      TBpkgid: ""
    };
    return this.http.post(APIURL + '/Api/Dealers/GetCusts', params);
  }
  getCustsById(id?: any, code?: any, name?: any, phone?: any, email?: any, voucherCode?: any, expDateFrom?: any, expDateTo?: any) {

    let params = {
      Token: this.token,
      ActivityArr: id,
      ItemId: code,
      Name: name,
      Phone: phone,
      Email: email,
      VoucherId: voucherCode,
      OrigSendDate: expDateFrom,
      LastSendDate: expDateTo,
    }
    return this.http.post(APIURL + '/Api/Dealers/GetCusts', params)
  }
  getCustsByIdActivity(id?: any, code?: any, name?: any, phone?: any, email?: any, voucherCode?: any, expDateFrom?: any, expDateTo?: any) {
    console.log("id", id);

    let params = {
      Token: this.token,
      ActivityArr: id,
      ItemId: code,
      Name: name,
      Phone: phone,
      Email: email,
      VoucherId: voucherCode,
      OrigSendDate: expDateFrom,
      LastSendDate: expDateTo,
    }
    return this.http.post(APIURL + '/Api/Dealers/GetCusts', params)
  }
  getAllCusts(name?: any, contactType?: any, selectedDepartment?: any, selectedRole?: any, birdthdayFrom?: any, birdthdayTo?: any, startJobDateFrom?: any, startJobDateTo?: any, value?: any) {
    let params = {
      Token: this.token,
      Name: name,
      TeamBuildName: contactType,
      Department: selectedDepartment,
      type: selectedRole,
      sendDate: birdthdayFrom,
      LastSendDate: birdthdayTo,
      //האם יש תאריך תחילת עבודה? וכן תאריך סיום וואליו-- מולטיפאס
    }
    return this.http.post(APIURL + '/Api/Dealers//GetCusts', params)
  }

  Resend(custIds: string) {
    let params = {
      CustId: custIds,
      Token: this.token
    }
    return this.http.post(APIURL + '/Api/Dealers/ResendVoucher', params);
  }
  updateCust(custId: number, name: string = '', phone: string = '', mail: string = '', mngEmail = '', sendDate: Date = null) {
    let params = {
      Token: this.token,
      CustId: "0" + custId,
      Name: name,
      Phone: phone,
      Email: mail,
      ManagerEmail: mngEmail,
      SendDate: this.formatDate(sendDate, true)
    };
    return this.http.post(APIURL + '/Api/Dealers/UpdateCust', params);
  }

  InsertCust(ActivityId: number, name: string, phone: string, email: string, ManagerEmail: string, Tz: number, WorkerNo: number, sendDate: string) {
    let params = {
      Token: this.token,
      ActivityId: ActivityId,
      Name: name,
      Phone: phone,
      Email: email,
      ManagerEmail: ManagerEmail,
      TZ: Tz,
      WorkerNo: WorkerNo,
      Department: '',
      SendDate: sendDate
    }
    return this.http.post(APIURL + '/Api/Dealers/InsertCust', params).pipe(
      map(result => {
        return result;
      }),
      catchError(err => {
        return of(err.message);
      })
    );

  }
  getTBPackage(pkgid: string) {
    return this.http.post(APIURL + '/Api/TeamBuild/GetTeamBuildPkg', { PackageId: pkgid });
  }
  getCustsByTBPackage(id: any) {
    let params = {
      Token: this.token,
      TBpkgid: id
    }
    return this.http.post(APIURL + '/Api/Dealers/getCusts', params)
  }
  getApproverCusts(tbid: number) {
    let params = {
      Token: this.token,
      SortBy: "name",
      ApproverEmail: this.username,
      TBpkgid: tbid
    }
    return this.http.post(APIURL + 'GetCusts', params);
  }
  validateTB(packageId: string, valField: string) {
    let params = {
      PackageId: packageId,
      ValidationField: valField
    }
    return this.http.post(APIURL + '/Api/TeamBuild/validate', params);
  }
  doApprove(order: number, status: number, notes: string) {
    let params = {
      Token: this.token,
      OrderId: order,
      Status: status,
      Notes: notes
    }
    return this.http.post(APIURL + '/Api/TeamBuild/DoApprove', params);
  }
  formatDate(date: Date, enGB = false) {
    if (!date || isNaN(date.valueOf()) || date.valueOf() == 0) return '';
    let year = date.getFullYear(), month = '' + (date.getMonth() + 1), day = '' + date.getDate();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (enGB) return day + '/' + month + '/' + year;
    return year + '-' + month + '-' + day;
  }
  //TAL
  getActivities(createDateFrom?: any, createDateTo?: any, fromPrice?: any, toPrice?: any, name?: any) {
    let params = {
      Token: this.token,
      CreationDateFrom: createDateFrom,
      CreationDateTo: createDateTo,
      Name: name,
      PriceFrom: fromPrice,
      PriceTo: toPrice
    }
    return this.http.post(APIURL + '/Api/Dealers/GetActivities', params)
  }
  getActivityById(id?: any) {
    let params = {
      Token: this.token,
      ActivityId: id
    }
    return this.http.post(APIURL + '/Api/Dealers/GetActivities', params)
  }
  getVouchers(id?: any, sum?: any, lastOrderDate?: any, ValidOrderDate?: any, priceFrom?: any, priceTo?: any, name?: any, available?: any) {
    let params = {
      Token: this.token,
      LoadSum: sum,
      LastOrderDate: lastOrderDate,
      PriceFrom: priceFrom,
      PriceTo: priceTo,
      ItemId: id,
      ItemName: name,
      Available: available
    }
    return this.http.post(APIURL + '/Api/Dealers/GetVouchers', params)

  }
  getMultipleChoice(name?: any, creationDateFrom?: any, creationDateTo?: any, obligoFrom?: any, obligoTo?: any) {
    let params = {
      Token: this.token,
      Name: name,
      CreationDateFrom: creationDateFrom,
      CreationDateTo: creationDateTo,
      ObligoFrom: obligoFrom,
      ObligoTo: obligoTo
    }
    return this.http.post(APIURL + '/Api/Dealers/getMultipleChoice', params)

  }
  removeCust(custId: any) {
    let params = {
      Token: this.token,
      CustId: custId
    }

    return this.http.post(APIURL + '/Api/Dealers/RemoveCust', params)
  }
  getDealerInInfo() {
    let params = {
      Token: this.token
    }
    return this.http.post(APIURL + '/Api/Dealers/GetDealerInInfo', params)
  }
}
