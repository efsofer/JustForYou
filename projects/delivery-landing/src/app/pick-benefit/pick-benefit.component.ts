import { Component, OnInit } from '@angular/core';
import { HttpService, Benefit } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pick-benefit',
  templateUrl: './pick-benefit.component.html',
  styleUrls: ['./pick-benefit.component.scss']
})
export class PickBenefitComponent implements OnInit {

  constructor(private _http: HttpService, private route: ActivatedRoute) { }

  benefits: Benefit[] = [];
  isIE = false;

  ngOnInit(): void {
    if (navigator.userAgent.indexOf('MSIE') !== -1
      || navigator.appVersion.indexOf('Trident/') > -1) {
      this.isIE = true;
    }
    if (!this._http.VC_Voucher) {
      this._http.routeToHome();
      return;
    }
    if (!this._http.benefit.value.combined) this._http.benefit.next(this._http.allBenefits[this.route.snapshot.queryParamMap.get('p')]);
    this.initBenefits();
  }

  initBenefits(b: Benefit = this._http.benefit.value) {
    if (b.extras) {
      for (let extra of b.extras) {
        this.initBenefits(this._http.allBenefits[extra]);
      }
    }
    if (b.items) {
      for (let item of b.items) {
        item.PromoID = this._http.benefit.value.PromoID;
        this.benefits.push(item);
      }
    }
    else if (b.combined) {
      for (let item of b.combined) {
        item.PromoID = this._http.benefit.value.PromoID;
        if (b.isVC) item.isVC = 1;
        this.benefits.push(item);
      }
    }
    else {
      b.PromoID = this._http.benefit.value.PromoID;
      if (this._http.benefit.value.isVC) b.isVC = 1;
      this.benefits.push(b);
    }
  }

  pick(benefit: Benefit) {
    this._http.benefit.next(benefit);
    if (benefit.name == "shookbook") this._http.routeTo('shookbook');
    if (benefit.convertId) this._http.routeTo('convert');
    else this._http.routeTo('delivery');
  }
}
