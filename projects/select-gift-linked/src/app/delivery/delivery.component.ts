import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService, Product } from '../http.service';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  product: Product = this.http.product.value;
  isLoading: boolean = false;
  deliveryForm: FormGroup;
  cities: string[];
  filteredCities: BehaviorSubject<string[]> = new BehaviorSubject([]);
  streets: string[];
  filteredStreets: BehaviorSubject<string[]> = new BehaviorSubject([]);

  @Output() actionEvent = new EventEmitter<number>();

  ngOnInit(): void {
    this.deliveryForm = new FormGroup({
      'recipient': new FormControl(),
      'phone': new FormControl('', Validators.pattern('^0[0-9]{8,9}$')),
      'street': new FormControl(),
      'streetnum': new FormControl(),
      'aptnum': new FormControl(),
      'floor': new FormControl(),
      'city': new FormControl(),
      'notes': new FormControl()
    });
    if (this.product.pickUp) this.deliveryForm.addControl('deliveryMethod', new FormControl('pickup'));
    else this.city.setValidators([Validators.required, this.checkAddress(this.product)]);
    if (this.product.credit) {
      this.deliveryForm.addControl('creditNum', new FormControl('', Validators.pattern('[0-9]{9,16}')));
      this.deliveryForm.addControl('creditExp', new FormControl('', Validators.pattern('[0-9]{2}\/[0-9]{2}')));
    }
    if (this.product.options) {
      for (let i = 0; i < this.product.options.length; ++i) {
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

  checkAddress(product: Product): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      if (product.allowedCities) {
        if (!product.allowedCities.includes(control.value)) return { 'outOfRange': true };
      }
      return null;
    };
  }

  toggleValidation() {
    if (this.deliveryMethod.value == 'pickup') {
      this.city.clearValidators();
      this.street.clearValidators();
      this.streetnum.clearValidators();
    }
    else {
      this.city.setValidators([Validators.required, this.checkAddress(this.product)]);
      this.street.setValidators(Validators.required);
      this.streetnum.setValidators(Validators.required);
    }
    this.city.updateValueAndValidity();
    this.street.updateValueAndValidity();
    this.streetnum.updateValueAndValidity();
  }

  submitDelivery() {
    this.isLoading = true;
    if (!this.deliveryForm.valid) return;
    const recip = this.getField('recipient'), phone = this.getField('phone'), str = this.getField('street');
    const strnum = this.getField('streetnum'), city = this.getField('city'), floor = this.getField('floor'), aptnum = this.getField('aptnum');
    let notes = this.getField('notes');
    if (this.product.options) {
      let opts: string[] = [];
      for (let i = 0; i < this.product.options.length; ++i) {
        if (this.product.options[i].type == 'text')
          opts.push(this.product.options[i].label + ' ' + this.deliveryForm.get('option_' + i).value);
        else opts.push(this.product.options[i].label + ' ' + JSON.parse(this.deliveryForm.get('option_' + i).value).text);
      }
      let optsString = opts.join(', ');
      notes = optsString + '. ' + notes;
    }
    if (this.product.pickUp && this.deliveryMethod.value == 'pickup') {
      if (notes != '') notes += ' איסוף עצמי';
      else notes = 'איסוף עצמי';
    }
    if (this.product.credit) notes += (' [[' + this.getField('creditNum') + ', ' + this.getField('creditExp') + ']]');
    let data: string;
    this.http.submitDelivery(recip, phone, str, strnum, aptnum, floor, city, notes).subscribe({
      next: (resp: any) => data = resp.errdesc, complete:
        () => {
          this.isLoading = false;
          if (data != 'OK') {
            // ERROR
            return;
          }
          this.actionEvent.emit(2);
        }
    });
  }

  goBack() {
    this.actionEvent.emit(0);
  }

  submitForm() {
    this.actionEvent.emit(1);
  }

  getField(field: string) {
    let value = this.deliveryForm.get(field).value;
    return value ? value.replace(';', '') : '';
  }

  get recipient() { return this.deliveryForm.get('recipient'); }
  get phone() { return this.deliveryForm.get('phone'); }
  get city() { return this.deliveryForm.get('city'); }
  get street() { return this.deliveryForm.get('street'); }
  get streetnum() { return this.deliveryForm.get('streetnum'); }
  get aptnum() { return this.deliveryForm.get('aptnum'); }
  get floor() { return this.deliveryForm.get('floor'); }
  get deliveryMethod() { return this.deliveryForm.get('deliveryMethod'); }
  get creditNum() { return this.deliveryForm.get('creditNum'); }
  get creditExp() { return this.deliveryForm.get('creditExp'); }
}
