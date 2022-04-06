import { Component, OnInit } from '@angular/core';
import { HttpService, Benefit } from '../http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  benefit: Benefit = this.http.benefit.value;
  isLoading: boolean = false;
  vcVoucher = this.http.VC_Voucher;
  extVoucher = '';
  validDate = '';
  sendForm!: FormGroup;
  sent = false;

  ngOnInit(): void {
    if (!this.http.VC_Voucher) {
      this.http.routeToHome();
      return;
    }
    this.sendForm = new FormGroup({
      'phone': new FormControl('', Validators.pattern('^0[0-9]{9}$'))
    });
  }

  changeCoupon() {
    this.isLoading = true;
    if (this.benefit.PromoID == 7407) {
      this.changeNC();
      return;
    }
    let data: any;
    this.http.changeCoupon().subscribe({next: resp => data = resp, complete: () => {
      if (!data.err) {
        this.extVoucher = data.dt[0].ReturnedCoupon;
        this.validDate = data.dt[0].ValidationDate.substring(0, 10);
        this.redeemVoucher();
      }
    }})
  }

  changeNC() {
    let data: any;
    this.http.changeNewCard().subscribe({next: (resp: any) => data = resp, complete: () => {
      if (!data.err) {
        this.extVoucher = data.dt[0].ReturnedCoupon;
        this.validDate = data.dt[0].ValidationDate.substring(0, 10);
        this.submitConversion();
      }
    }});
  }

  submitConversion() {
    let data: any;
    this.http.submitConversion(this.extVoucher).subscribe({next: resp => data = resp, complete: () => {
      if (data.errdesc == 'OK') {
        this.isLoading = false;
      }
    }})
  }

  redeemVoucher() {
    let resp = '';
    this.http.redeemVoucher().subscribe({
      next: (data: string) => resp = data,
      error: (err: any) => {
        if (!this.benefit.isVC && err.status == 404) {
          this.submitConversion();
        }
      },
      complete: () => {
        let retCode = '';
        if (this.benefit.isVC) {
          let open = resp.indexOf('ReturnCode'), close = resp.indexOf('</ReturnCode');
          retCode = resp.substring(open + 11, close);
        }
        else retCode = '1';
        if (retCode == '1') {
          this.submitConversion();
        }
      }
    });
  }

  sendSMS() {
    this.sendForm.disable();
    this.http.sendSMS(this.extVoucher, this.validDate, this.phone.value).subscribe({complete: () => {this.sent = true; this.sendForm.enable();}});
  }

  goBack() {
    let pick = this.route.snapshot.queryParamMap.get('p');
    if (pick) {
      this.http.benefit.next(this.http.allBenefits[pick]);
      this.http.routeTo('pick');
    }
    else this.http.routeTo('');
  }

  get phone() { return this.sendForm.get('phone'); }

}
