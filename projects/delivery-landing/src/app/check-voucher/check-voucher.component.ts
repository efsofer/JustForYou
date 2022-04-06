import { Component, OnInit } from '@angular/core';
import { HttpService, Benefit } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-check-voucher',
  templateUrl: './check-voucher.component.html',
  styleUrls: ['./check-voucher.component.scss']
})
export class CheckVoucherComponent implements OnInit {

  constructor(private _http: HttpService, private route: ActivatedRoute, private titleService: Title) { }

  /* @inv: no benefit has both "combined" and "items" */

  unsupportedBrowser: boolean = false;
  combinedKey: string = '';
  vcValue: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  isPais = false;

  /*i = 0;
  custnums: number[] = [170552,170553,170554,170555,170556,170557,170558,170559,170560,170561,170562,170563,170564,170565,170566,170567,170568,170569,170570,170571,170572,170573,170574,170575,170576,170577,170578,170579,170580,170581,170582,170583,170584,170585,170586,170587,170588,170589,170590,170591,170592,170593,170594,170595,170596,170597,170598,170599,170600,170601,170602,170603,170604,170605,170606,170607,170608,170609,170610,170611,170612,170613,170614,170615,170616,170617,170618,170619,170620,170621,170622,170623,170624,170625,170626,170627,170628,170629,170630,170631,170632,170633,170634,170635,170636,170637,170638,170639,170640,170641,170642,170643,170644,170645,170646,170647,170648,170649,170650,170651]
  encrypted: string[] = [];*/

  ngOnInit(): void {
    /*if (navigator.userAgent.indexOf('MSIE') !== -1
      || navigator.appVersion.indexOf('Trident/') > -1) {
      this.unsupportedBrowser = true;
      return;
    }*/
    const benefit = this.route.snapshot.queryParamMap.get('b');
    const vcVoucher = this.route.snapshot.queryParamMap.get('voucher');
    let benefits: any;
    this._http.getBenefits().subscribe({
      next: (data: any) => benefits = data, complete: () => {
        this._http.allBenefits = benefits;
        if (benefit && benefits[benefit]) {
          if (benefit == 'pais') this.isPais = true;
          this._http.benefit.next(benefits[benefit]);
          this.titleService.setTitle(this._http.benefit.value.tabtitle);
        }
        if (vcVoucher) {
          this.vcValue = vcVoucher;
          this.checkVoucher();
        }
      }
    });
    //this.encodeStuff();
  }
  /*encodeStuff() {
    if (this.i >= this.custnums.length) {
      console.log(this.encrypted);
      return;
    }
    this._http.encode('' + this.custnums[this.i]).subscribe({next: (data: any) => {if (data && data.dt) this.encrypted.push(data.dt[0].Encrypted)}, complete: () => {++this.i; this.encodeStuff()}});
  }
  
  sendStuff() {
    this._http.sendToHapoalim(this.names[this.i], this.codes[this.i], this.phones[this.i], this.encoded).subscribe({complete: () => {
      ++this.i; if (this.i < 1070) this.encodeStuff();}});
  }*/

  checkVoucher() {
    this.isLoading = true;
    let resp: any;
    this._http.checkVoucher(this.vcValue).subscribe({
      next: (data: any) => resp = data, complete: () => {
        let valid = false;
        if ((!this._http.benefit.value && this.vcValue.indexOf('620') === 0) || (this._http.benefit.value && this._http.benefit.value.isVC))
          valid = this.checkVCVoucher(resp);
        else valid = this.checkExtVoucher(resp);
        if (!valid) {
          this.isError = true;
          this.isLoading = false;
          return;
        }
        this._http.VC_Voucher = this.vcValue.trim();
        if (this._http.benefit.value.name == 'shookbook') this._http.routeTo('shookbook');
        else if (this._http.benefit.value.combined) this._http.routeToParams('pick', { p: this.combinedKey, voucher: null });
        else this._http.routeToParams('delivery', {voucher: null});
      }
    });
  }

  private checkVCVoucher(resp: string): boolean {
    if (this.getXMLParam('StatusID', resp) != '1') return false;
    let benefits = this.getXMLParam('AvailableBenefits', resp), trans = this.getXMLParam('TransactionId', resp), balance = this.getXMLParam('PrepaidBalance', resp);
    this._http.VC_Trans = trans;
    if (parseInt(balance) == 115) {
      this._http.benefit.next(this._http.allBenefits['Electra_NewCard']);
      this.combinedKey = 'Electra_NewCard';
      return true;
    }
    const promoId = parseInt(benefits.split('|')[0]);
    let valid = false;
    /*if (this._http.benefit.value) {
      if (this._http.benefit.value.items) {
        for (let i of this._http.benefit.value.items) {
          if (i.PromoID == promoId) {
            this._http.benefit.next(i);
            break;
          }
        }
      }
      if (this._http.benefit.value.PromoID == promoId) valid = true;
    } else {*/
    for (let b in this._http.allBenefits) {
      if (this._http.allBenefits[b].items) {
        for (let i of this._http.allBenefits[b].items) {
          if (i.PromoID == promoId) {
            this._http.benefit.next(this._http.allBenefits[b]);
            valid = true;
            this._http.benefit.next(i);
            break;
          }
        }
      }
      if (this._http.allBenefits[b].PromoID == promoId) {
        valid = true;
        if (this._http.allBenefits[b].combined) this.combinedKey = b;
        this._http.benefit.next(this._http.allBenefits[b]);
        break;
      }
    }
    //}
    if (valid) this._http.VC_PROMO_ID = promoId + '0';
    return valid;
  }

  private getXMLParam(pName: string, resp: string) {
    let open = resp.indexOf(pName), close = resp.indexOf('</' + pName);
    return resp.substring(open + pName.length + 1, close);
  }

  private checkExtVoucher(resp: any): boolean {
    if (!resp.dt || !resp.dt.length) return false;
    for (let b in this._http.allBenefits) {
      if (!this._http.allBenefits[b].isVC) {
        for (let item of resp.dt) {
          if (item.itemid == this._http.allBenefits[b].PromoID && item.Used && !item.CouponInExternal) {
            this._http.benefit.next(this._http.allBenefits[b]);
            return true;
          }
        }
      }
    }
    return false;
  }

}