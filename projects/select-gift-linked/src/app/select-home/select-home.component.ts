import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent implements OnInit {

  mainOrder = this._http.order.value;
  linkedOrders = this._http.linkedOrders;
  isLoading: boolean = true;
  isIE: boolean = false;
  expanded = this._http.lockedOrderIndex;
  locked: boolean = this._http.lockedOrderIndex != -1;

  constructor(private _http: HttpService, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.checkValidation()) return;
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1
      || navigator.appVersion.indexOf('Trident/') > -1) {
      this.isIE = true;
    }
    this.getOrderHeaders(0);
    this._http.getProducts().subscribe((resp: any) => this._http.allProducts = resp);
  }

  getOrderHeaders(i: number) {
    if (i >= this.linkedOrders.length) {
      this.isLoading = false;
      return;
    }
    let currOrder: any;
    this._http.getOrderHeader(this.linkedOrders[i].orderId).subscribe({next: (resp: any) => {if (resp.response) currOrder = resp.response[0];}, complete: () => {
      this.linkedOrders[i].info = currOrder;
      if (this.linkedOrders[i].image) this.linkedOrders[i].info.headerbackpicture = this.linkedOrders[i].image;
      this.getOrderHeaders(i + 1);
    }});
  }

  expand(ind: number) {
    if (this.locked) return;
    if (ind == this.expanded) {
      this.expanded = -1;
      return;
    }
    this.expanded = ind;
    setTimeout(() => {
      if (!this.isInView()) this.el.nativeElement.querySelector('.order-container').scrollIntoView();
    }, 1);
  }

  isInView(): boolean {
    const rect = this.el.nativeElement.querySelector('.order-container').getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - 100)
    );
  }
}
