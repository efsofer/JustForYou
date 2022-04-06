import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  id: string;
  order: any;
  vldValue: string = '';
  isError: boolean = false;
  expired: boolean = false;

  constructor(private _http: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this._http.getOrder(this.id);
      this._http.order.pipe(take(2)).subscribe({
        next: data => this.order = data, complete: () => {
          this._http.ids.OrderId = this.id;
          if (this.id == '15GsfImdm_8bj81HyHyiOQ2') {
            this.vldValue = '1';
            this.onVldSubmit();
          }
        }
      });
    }
    else this._http.routeTo404();
  }

  onVldSubmit() {
    let employee: any = {
      "OrderId": this.id,
      "ValidationField": this.vldValue
    }
    this._http.validateEmployee(<JSON>employee).subscribe({
      next: (data: any) => {
        this._http.employee.next(data.response);
      }, complete: () => {
        if (this._http.employee.value == null) {
          this.isError = true;
          return;
        }
        this._http.employee.next(this._http.employee.value[0]);
        this._http.ids.ValidationField = this.vldValue;
        employee = this._http.employee.value;
        if (employee.history == null) {
          let expiryDate = new Date(this.order.vieworderenddate);
          expiryDate.setDate(expiryDate.getDate() + 1);
          let today = new Date();
          if (today > expiryDate) {
            this.expired = true;
            return;
          }
          this.routeTo('/select');
        }
        else {
          this._http.choice.next(this._http.employee.value.history);
        }
      }
    });
  }

  routeTo(path: string) {
    this.router.navigate([path], { skipLocationChange: true, queryParamsHandling: 'preserve' });
  }

}