import { Component, OnInit } from '@angular/core';
import { HttpService, LinkedOrder } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  id: string;
  order: any;
  vldField: number = 0;
  vldLabel: string = '';
  vldValue: string = '';
  isError: boolean = false;
  errorText: string;
  chosenItems: any[] = [];
  expired = true;
  isLoading = false;

  constructor(private _http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (!this.id) {
      this._http.routeTo404();
      return;
    }
    this._http.getOrder(this.id);
    this._http.order.pipe(take(2)).subscribe({
      next: data => this.order = data, complete: () => {
        this.vldField = this.order.validatortype;
        switch (this.vldField) {
          case 1: {
            this.vldLabel = 'מספר תעודת זהות (9 ספרות)';
            break;
          }
          case 2: {
            this.vldLabel = 'מספר עובד';
            break;
          }
          case 5: { // mercantile bank
            this.vldLabel = 'תאריך לידה (6 ספרות) + מספר סניף/מחלקה (3 ספרות) ברצף. למשל, עבור התאריך 01.01.2001 וסניף 999, יש להזין 010101999';
            break;
          }
          case 3: {
            this.vldLabel = 'מספר טלפון';
            break;
          }
          case 4: {
            this.vldLabel = 'כתובת מייל';
          }
        }
        this._http.getLinkedOrdersList().subscribe({
          next: (data: any) => this._http.allOrders = data, complete: () => {
            if (this._http.allOrders[this._http.order.value.id]) {
              this._http.ids.OrderId = this.id;
              this._http.linkedOrders = this._http.allOrders[this._http.order.value.id];
            }
            else {
              this._http.routeTo404();
              return;
            }
          }
        });
      }
    });
  }

  syncValidate(i: number, checkForLock: boolean = false, j: number = 0) {
    if (i >= this._http.linkedOrders.length) {
      this.routeNext();
      return;
    }
    const linkedOrder = this._http.linkedOrders[i];
    if (linkedOrder.addonItems && j >= linkedOrder.addonItems.length) {
      this.routeNext(i);
      return;
    }
    let employee: any = {
      OrderId: linkedOrder.orderId,
      ValidationField: this.vldValue
    };
    if (linkedOrder.addonItems && !checkForLock) employee.ValidationField = this._http.validationString(j);
    this._http.validateEmployee(<JSON>employee).subscribe({next: (resp: any) => this._http.employee.next(resp.response), error: () => this.isError = true, complete: () => {
      if (this._http.employee.value == null || !this._http.employee.value.length) {
        this.notIdentified();
        return;
      }
      this._http.employee.next(this._http.employee.value[0]);
      employee = this._http.employee.value;
      if (employee.history == null && employee.items == null) {
        this.notIdentified();
        return;
      }
      let chose = this.validationHelper(employee);
      if (chose) {
        if (checkForLock) this.syncValidate(i, false, 1);
        else if (j == 0 && linkedOrder.addonItems) this.syncValidate(i, true);
        else if (j > 0) this.syncValidate(i, false, j + 1);
        else this.routeNext(i);
      }
      else {
        this._http.linkedOrders[i].items = employee.items;
        if (checkForLock) {
          this._http.lockedOrderIndex = i;
          this.syncValidate(i, false, 1);
        }
        else this.syncValidate(i + 1);
      }
    }});
  }

  routeNext(i: number = -1) {
    this.isLoading = false;
    if (i != -1) {
      this._http.choseOrderIndex = i;
      this._http.linkedOrders[i].history = this.chosenItems;
    }
    if (this.chosenItems.length > 0 && this._http.lockedOrderIndex == -1) this._http.routeTo('selected');
    else if (this.expired) {
      this.errorText = 'מצטערים, לא ניתן לבחור עוד מתנות באתר זה :(';
      this.isError = true;
    }
    else this._http.routeTo('select-home');
  }

  validationHelper(employee: any): boolean {
    this._http.ids.ValidationField = this.vldValue;
    if (employee.history == null) {
      let expiryDate = new Date(this.order.vieworderenddate);
      expiryDate.setDate(expiryDate.getDate() + 1);
      let today = new Date();
      if (today <= expiryDate) {
        this.expired = false;
      }
      return false; // did not choose
    }
    else {
      this.chosenItems.push(employee.history[0]);
      return true; // chose
    }
  }

  notIdentified() {
    this.isLoading = false;
    this.errorText = 'מצטערים, לא מצאנו אתכם...\nאנא פנו לארגון שלכם או לשירות דור חדש בשוברים בטלפון: 03-5322313';
    this.isError = true;
  }

}