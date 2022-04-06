import { Component, OnInit } from '@angular/core';
import { HttpService, Benefit } from '../http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shookbook',
  templateUrl: './shookbook.component.html',
  styleUrls: ['./shookbook.component.scss']
})
export class ShookbookComponent implements OnInit {
  count: number;

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  benefit: Benefit = this.http.benefit.value;
  isLoading: boolean = false;
  isError: boolean = false;
  optionsReady = false;
  deliveryForm!: FormGroup;
  pickWindow = new FormGroup({ 'deliveryWindow': new FormControl() });
  deliveryNum: number = 0;
  cities: string[] = [];
  filteredCities: BehaviorSubject<string[]> = new BehaviorSubject([]);
  streets: string[] = [];
  filteredStreets: BehaviorSubject<string[]> = new BehaviorSubject([]);
  nextDays: any;
  daysForCity: any;
  availableWindows: any[] = [];
  weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    if (!this.http.VC_Voucher) {
      this.http.routeToHome();
      return;
    }
    this.deliveryForm = new FormGroup({
      'recipient': new FormControl(),
      'phone': new FormControl('', Validators.pattern('^0[0-9]{8,9}$')),
      'city': new FormControl(),
      'street': new FormControl(),
      'streetnum': new FormControl(),
      'floor': new FormControl(),
      'apartment': new FormControl(),
      'entryCode': new FormControl()
    }, this.checkAddress);
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
    this.http.getNextDays().subscribe((data: any) => {
      if (data.objects) this.nextDays = data.objects.deliveryDates
    });
  }

  private _filter(value: string, type: string): string[] {
    if (value == '') return [];
    const array = type == 'city' ? this.cities : this.streets;
    return array.filter( (item) => {
      if (this.count < 10 && item.includes(value)) {
        ++this.count;
        return true;
      }
      return false;
    }, { count: 0 });
  }

  checkAddress(fg: FormGroup) {
    return null;
  }

  getDeliveryWindows() {
    this.isError = false;
    this.optionsReady = false;
    this.isLoading = true;
    this.availableWindows = [];
    this.http.getDaysForCity(this.city.value).subscribe({
      next: (resp: any) => this.daysForCity = resp, error: () => {
        this.isError = true;
        this.isLoading = false;
        return;
      }, complete: () => {
        if (this.daysForCity.error) {
          this.isError = true;
          this.isLoading = false;
          return;
        }
        this.daysForCity = this.daysForCity.objects.cityGroups[0];
        this.filterAvailableDates();
        if (this.availableWindows.length == 0) {
          this.isError = true;
          this.isLoading = false;
          return;
        }
        this.optionsReady = true;
        this.isLoading = false;
      }
    })
  }

  private filterAvailableDates() {
    let i = 0;
    for (let pDay of this.nextDays) {
      if (i == 10) break;
      if (new Date(pDay.date) > new Date(2020,4,30)) this.ShavuotFix();
      const pDate = new Date(pDay.date);
      pDate.setDate(pDate.getDate() - 1);
      if (pDay.eveningCapacity > 0 && this.daysForCity[this.weekDays[pDate.getDay()] + 'e']) {
        this.pushDay(pDate, 1);
        ++i;
      }
      if (i == 10) break;
      pDate.setDate(pDate.getDate() + 1);
      if (pDay.morningCapacity > 0 && this.daysForCity[this.weekDays[pDate.getDay()] + 'm']) {
        this.pushDay(pDate, 0);
        ++i;
      }
    }
  }

  private pushDay(day: Date, window: number) {
    this.availableWindows.push({
      date: new Date(day),
      dateLbl: day.toLocaleDateString('he-IL', { weekday: 'long', month: '2-digit', day: '2-digit' }),
      hours: window === 0 ? '08:00-17:00' : '16:00-23:00',
      window: window
    });
  }

  private ShavuotFix() {
    let area: string = this.daysForCity.description;
    if (area == 'Jerusalem-1' || area == 'Jerusalem-2' || area == 'Shfela-4') {
      this.daysForCity.wedm = 0;
      this.daysForCity.thum = 1;
    } else if (area == 'North-1' || area == 'North-2') {
      this.daysForCity.wedm = 0;
      this.daysForCity.thue = 1;
    }
  }

  submitDelivery() {
    this.isLoading = true;
    if (!this.deliveryForm.valid) return;
    let resp: any;
    this.http.submitOrder(this.recipient.value, this.phone.value, this.street.value, this.streetnum.value, this.city.value,
      this.apartment.value, this.floor.value, this.entryCode.value, this.availableWindows[this.deliveryWindow.value]).subscribe({
        next: (data: any) => resp = data, error: () => {
          this.isError = true;
          this.isLoading = false;
          return;
        },
        complete: () => {
          this.submitJ4U();
          this.redeemVoucher();
        }
      });
  }

  submitJ4U() {
    const recip = this.getField('recipient'), phone = this.getField('phone'), str = this.getField('street');
    const strnum = this.getField('streetnum'), city = this.getField('city'), aptnum = this.getField('apartment'), floor = this.getField('floor');
    const window = this.availableWindows[this.deliveryWindow.value];
    let data = '';
    this.http.submitShookBook(recip, phone, str, strnum, city, aptnum, floor, window.dateLbl + ', ' + window.hours).subscribe({
      next: (resp: any) => data = resp.errdesc, complete: () => {
        this.isLoading = false;
        if (data != 'OK') {
          this.isError = true;
          return;
        }
        this.deliveryNum = parseInt(this.http.VC_Voucher.substring(4));
      }
    });
  }

  getField(field: string) {
    let value = this.deliveryForm.get(field).value;
    return value ? value.replace(';', '') : '';
  }

  redeemVoucher() {
    this.http.redeemVoucher().subscribe({ complete: () => this.isLoading = false });
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
  get apartment() { return this.deliveryForm.get('apartment'); }
  get floor() { return this.deliveryForm.get('floor'); }
  get entryCode() { return this.deliveryForm.get('entryCode'); }
  get deliveryWindow() { return this.pickWindow.get('deliveryWindow'); }

}
