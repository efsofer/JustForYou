import { Component, OnInit } from '@angular/core';
import { HttpService, Benefit, Option } from '../http.service';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

// const DEFAULT_GREETING = 'חג שמח לך ולבני משפחתך,\nחג של תקווה, חג של חום ואהבה,\nמי ייתן והאביב יביא עמו התחלות חדשות.\nונחזור לשגרה במהרה!\nבריאות לכולם.';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

export class DeliveryComponent implements OnInit {

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  benefit: Benefit = this.http.benefit.value;
  orderCustItem: string[] = [];
  isPais = this.benefit ? this.benefit.name == 'pais' : false;
  isLoading: boolean = false;
  deliveryForm: FormGroup;
  //customGreeting: boolean = false;
  deliveryNum: number = 0;
  cities: string[];
  filteredCities: BehaviorSubject<string[]> = new BehaviorSubject([]);
  streets: string[];
  filteredStreets: BehaviorSubject<string[]> = new BehaviorSubject([]);
  isIsolated: boolean = false;
  urge: string = '1';
  isTransfer: boolean = false;
  imgSrc = this.benefit ? this.benefit.image : '';
  deliveryCompany = this.benefit ? (this.benefit.deliveryCompany == 'cargo' ? 'cargo' : 'isgav') : '';

  ngOnInit(): void {
    const isGeneralGift = this.route.snapshot.queryParamMap.get('gift');
    if (isGeneralGift) {
      this.isLoading = true;
      let temp: any, employee: any;
      this.http.decode(isGeneralGift).subscribe({next: (data: any) => temp = data.dt[0].Decrypted, complete: () => {
        this.orderCustItem = temp.split('-');
        if (this.orderCustItem.length != 3) {
          this.http.routeToHome();
          return;
        }
        this.http.encode(this.orderCustItem[0]).subscribe({next: (data: any) => temp = data.dt[0].Encrypted, complete: () => {
          this.http.validateEmployee(<JSON>(<any>{OrderId: temp, ValidationField: this.orderCustItem[1]}))
          .subscribe({next: (data: any) => employee = data.response, complete: () => {
            if (employee == null || !employee.length || employee[0].history == null) {
              this.http.routeToHome();
              return;
            }
            const item = employee.history[0];
            this.http.getItem(this.orderCustItem[2]).subscribe({next: (data: any) => temp = data.item[0], complete: () => {
              this.benefit = {
                tabtitle: "מתנות מפנקות עד הבית",
                header: {
                  background: "https://www.just4u.co.il/Pictures/22047_950.jpg",
                  title: "מתנות מפנקות עד הבית",
                  content: "<p>בלעדי ב-Just4u<br>מגוון מתרחב ומתעדכן של מתנות מפנקות עד הבית,<br>מכל הסוגים ובכל תקציב.<br>מארזים מיוחדים, גאדג'טים, כלי בית, מצעים,<br>צעצועים ופעילויות לכל המשפחה, ועוד.</p>",
                  image: "https://www.just4u.co.il/Pictures/D_1_j4u_logo_black.jpg"
                },
                id: temp.suppliers.length == 1 ? temp.suppliers[0].id : 62179, // orly's user id
                name: item.ITemName,
                PromoID: 0,
                isVC: 0,
                combined: null,
                isDelivery: 0,
                deliveryCompany: null,
                title: item.ITemName,
                image: '/Pictures/' + item.image,
                link: '/coupon/' + item.itemid,
                notes: item.description,
              }
              this.http.benefit.next(this.benefit);
              this.imgSrc = this.benefit.image;
              this.isLoading = false;
              this._init();
              return;
            }});
          }});
        }});
      }});
    }
    else if (!this.http.VC_Voucher) {
      this.http.routeToHome();
      return;
    }
    else this._init();
  }

  private _init() {
    this.deliveryForm = new FormGroup({
      'recipient': new FormControl(),
      'phone': new FormControl('', Validators.pattern('^0[0-9]{8,9}$')),
      'street': new FormControl(),
      'streetnum': new FormControl(),
      'aptnum': new FormControl(),
      'floor': new FormControl(),
      'city': new FormControl(),
      'sender': new FormControl(),
      'notes': new FormControl()
    });
    if (!this.benefit.isDelivery) {
      this.deliveryForm.addControl('senderphone', new FormControl('', Validators.pattern('^0[0-9]{8,9}$')));
      this.deliveryForm.addControl('greeting', new FormControl(/*{ value: !this.isPais ? DEFAULT_GREETING : '', disabled: true }*/));
      if (this.benefit.pickUp) this.deliveryForm.addControl('deliveryMethod', new FormControl('pickup'));
      else this.city.setValidators([Validators.required, this.checkAddress(this.benefit)]);
    }
    if (this.benefit.options) {
      for (let i = 0; i < this.benefit.options.length; ++i) {
        this.deliveryForm.addControl('option_' + i, new FormControl());
      }
    }
    let baldarSites: any;
    this.http.getBaldarSites().subscribe({
      next: (data) => baldarSites = data, complete: () => {
        this.cities = baldarSites.cities;
        this.streets = baldarSites.streets;
      }
    });
    this.deliveryForm.get('city').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'city'))
    ).subscribe(data => this.filteredCities.next(data));
    this.deliveryForm.get('street').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'street'))
    ).subscribe(data => this.filteredStreets.next(data));
  }

  private _filter(value: string, type: string): string[] {
    if (value == '') return [];
    const array = type == 'city' ? this.cities : this.streets;
    return array.filter(function (item) {
      if (this.count < 10 && item.includes(value)) {
        ++this.count;
        return true;
      }
      return false;
    }, { count: 0 });
  }

  checkAddress(benefit: Benefit): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      if (benefit.allowedCities) {
        if (!benefit.allowedCities.includes(control.value)) return { 'outOfRange': true };
      }
      return null;
    };
  }

  toggleValidation() {
    if (this.deliveryMethod.value == 'pickup') {
      this.city.clearValidators();
      this.street.clearValidators();
      this.streetnum.clearValidators();
      this.senderphone.clearValidators();
    }
    else {
      this.city.setValidators([Validators.required, this.checkAddress(this.benefit)]);
      this.street.setValidators(Validators.required);
      this.streetnum.setValidators(Validators.required);
      this.senderphone.setValidators(Validators.pattern('^0[0-9]{8,9}$'));
    }
    this.city.updateValueAndValidity();
    this.street.updateValueAndValidity();
    this.streetnum.updateValueAndValidity();
    this.senderphone.updateValueAndValidity();
  }

  toggleImage(opt: string) {
    const img = JSON.parse(opt).image;
    if (img) this.imgSrc = img;
  }

  /*checkAddress(fg: FormGroup) {
    return null;
    console.log(this);
    if (!this.filteredCities || !this.filteredStreets) return null;
    let curCities: string[] = this.filteredCities.getValue(), curStreets: string[] = this.filteredStreets.getValue();
    let valid: boolean = curCities.includes(fg.get('city').value) && curStreets.includes(fg.get('street').value);
    return valid ? null : { 'wrongAddress': true };
  }*/

  submitDelivery() {
    this.isLoading = true;
    if (!this.deliveryForm.valid) return;
    if (this.benefit.pickUp && this.deliveryMethod.value == 'delivery' && this.benefit.deliveryPage) {
      this.isTransfer = true;
    }
    const recip = this.getField('recipient'), phone = this.getField('phone'), str = this.isPais ? this.getField('street') + '|' : this.getField('street');
    const strnum = this.getField('streetnum'), city = this.getField('city'), sender = this.getField('sender'), floor = this.getField('floor');
    let notes = this.getField('notes'), aptnum = this.getField('aptnum');
    let sphone = '', greeting = '';
    if (this.benefit.options) {
      let opts: string[] = [];
      for (let i = 0; i < this.benefit.options.length; ++i) {
        if (this.benefit.options[i].type == 'text')
          opts.push(this.benefit.options[i].label + ' ' + this.deliveryForm.get('option_' + i).value);
        else opts.push(this.benefit.options[i].label + ' ' + JSON.parse(this.deliveryForm.get('option_' + i).value).text);
      }
      let optsString = opts.join(', ');
      notes = optsString + '. ' + notes;
    }
    if (!this.benefit.isDelivery) {
      sphone = this.getField('senderphone');
      greeting = this.getField('greeting');
      if (this.benefit.pickUp && this.deliveryMethod.value == 'pickup') {
        if (notes != '') notes += ' איסוף עצמי';
        else notes = 'איסוף עצמי';
      }
      if (this.isPais) {
        notes = '[[' + aptnum + ']]' + notes;
        aptnum = '';
      }
    }
    else {
      notes = 'מוצר למשלוח: ' + this.benefit.dProductDescription + '. ' + notes;
      if (sender && this.deliveryCompany == 'cargo') notes = '[[' + sender + ']]' + notes;
    }
    //if (greeting == DEFAULT_GREETING) greeting = '';
    let data: string;
    this.http.submitDelivery(recip, phone, str, strnum, aptnum, floor, city, notes, sender, sphone, greeting, this.getUrge()).subscribe({
      next: (resp: any) => data = resp.errdesc, complete:
        () => {
          if (data != 'OK') {
            this.isLoading = false;
            // ERROR
            return;
          }
          if (this.orderCustItem.length) {
            this.deliveryNum = 1;
            return;
          }
          if (this.benefit.isDelivery) {
            this.submitCADelivery();
          }
          else {
            this.deliveryNum = this.isPais ? 2 : 1;
            this.redeemVoucher();
          }
        }
    });
  }

  submitCADelivery() {
    let resp = '';
    this.http.submitCADelivery().subscribe({
      next: (data: string) => resp = data, complete: () => {
        const open = resp.indexOf('>', resp.indexOf('>') + 1), close = resp.indexOf('</');
        const respNum: number = parseInt(resp.substring(open + 1, close));
        if (respNum < 0) {
          this.isLoading = false;
          // ERROR
          return;
        }
        this.deliveryNum = respNum;
        this.redeemVoucher();
      }
    })
  }

  getField(field: string) {
    let value = this.deliveryForm.get(field).value;
    return value ? value.replace(';', '') : '';
  }

  redeemVoucher() {
    let resp = '';
    this.http.redeemVoucher().subscribe({
      next: (data: string) => resp = data,
      error: (err: any) => {
        if (!this.benefit.isVC && err.status == 404) {
          this.isLoading = false;
          if (this.isTransfer) location.href = this.benefit.deliveryPage.replace('VCVoucher', this.http.VC_Voucher);
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
          this.isLoading = false;
          if (this.isTransfer) location.href = this.benefit.deliveryPage.replace('VCVoucher', this.http.VC_Voucher);
        }
      }
    });
  }

  /*checkGreeting() {
    this.customGreeting = !this.customGreeting;
    if (!this.customGreeting) this.deliveryForm.get('greeting').disable();
    else this.deliveryForm.get('greeting').enable();
  }*/

  getUrge() {
    if (this.isIsolated) this.urge = '8';
    return this.urge;
  }

  goBack() {
    let pick = this.route.snapshot.queryParamMap.get('p');
    if (pick) {
      this.http.benefit.next(this.http.allBenefits[pick]);
      this.http.routeTo('pick');
    }
    else this.http.routeTo('');
  }

  get recipient() { return this.deliveryForm.get('recipient'); }
  get phone() { return this.deliveryForm.get('phone'); }
  get city() { return this.deliveryForm.get('city'); }
  get street() { return this.deliveryForm.get('street'); }
  get streetnum() { return this.deliveryForm.get('streetnum'); }
  get senderphone() { return this.deliveryForm.get('senderphone'); }
  get aptnum() { return this.deliveryForm.get('aptnum'); }
  get floor() { return this.deliveryForm.get('floor'); }
  get sender() { return this.deliveryForm.get('sender'); }
  get deliveryMethod() { return this.deliveryForm.get('deliveryMethod'); }
  //get deliveryWindow() { return this.deliveryForm.get('deliveryWindow'); }
}