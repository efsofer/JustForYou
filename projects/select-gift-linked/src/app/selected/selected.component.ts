import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { send } from 'process';

const SEND_COOLDOWN: number = 1800000; // 30 Minutes
const MAX_ATTEMPTS: number = 3;

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  order = this._http.linkedOrders[this._http.choseOrderIndex];
  choices = this.order.history;
  vDate: Array<string> = [];
  rDate: Array<string> = [];
  dateOptions: Object = { day: '2-digit', month: '2-digit', year: 'numeric' };
  sendPhone: boolean = false;
  sendMail: boolean = false;
  sendForm: FormGroup;
  sent: boolean = false;
  allowSend: boolean = true;
  canChange: boolean = false;
  endDate: string = '';

  constructor(private _http: HttpService, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.checkValidation()) return;
    if (localStorage.getItem('firstSend')) {
      const firstDate: any = new Date(localStorage.getItem('firstSend')), currDate: any = new Date();
      if (currDate - firstDate < SEND_COOLDOWN) {
        if (parseInt(localStorage.getItem('totalSent')) >= MAX_ATTEMPTS) this.allowSend = false;
      }
    }
    for (let choice of this.choices) {
      this.vDate.push(new Date(choice.ValidationDate).toLocaleDateString('en-GB', this.dateOptions));
      this.rDate.push((choice.RealizeDate) ? new Date(choice.RealizeDate).toLocaleDateString('en-GB', this.dateOptions) : '');
      if (choice.VCVoucherid == null || choice.VCVoucherid == '0') {
        choice.showCode = false;
      }
      if (choice.image.indexOf('/') === -1) choice.image = 'https://www.just4u.co.il/pictures/' + choice.image;
      else if (this.order.noCodeProducts && this.order.noCodeProducts.includes(choice.itemid)) {
        choice.showCode = false;
        if (this.order.noCodeNote) choice.noCodeNote = this.order.noCodeNote;
      }
      else if (this.order.autoChoose && this.order.autoChoose == choice.itemid) {
        if (this.order.autoChooseNoCodeNote) {
          choice.showCode = false;
          choice.noCodeNote = this.order.autoChooseNoCodeNote;
        }
      }
      else choice.showCode = true;
    }
    let lastDate = new Date(this._http.employee.value.lastdatetochange);
    this.endDate = lastDate.toLocaleDateString('en-GB', this.dateOptions);
    lastDate.setDate(lastDate.getDate() + 1);
    if (this._http.employee.value.canchange && !(new Date() > lastDate)) {
      this.canChange = true;
    }
    this.sendForm = new FormGroup({
      'phone': new FormControl('', Validators.pattern('^05[0-9]{8}$')),
      'email': new FormControl('', Validators.email)
    }, this.checkSend);
  }

  checkSend(fg: FormGroup) {
    return fg.get('phone').value == '' && fg.get('email').value == '' ? { 'noSend': true } : null;
  }

  onSendSubmit(itemid: number) {
    let sendDetails: any = {
      OrderId: this.order.orderId
    }
    if (this.order.addonItems) {
      for (let i = 0; i < this.order.addonItems.length; ++i) {
        if (itemid == this.order.addonItems[i]) sendDetails.ValidationField = this._http.validationString(i);
      }
    }
    if (!sendDetails.ValidationField) sendDetails.ValidationField = this._http.ids.ValidationField;
    if (this.sendPhone) {
      let phone = this.sendForm.get('phone');
      if (phone.value && phone.valid) sendDetails.Phone = phone.value;
    }
    if (this.sendMail) {
      let email = this.sendForm.get('email');
      if (email.value && email.valid) sendDetails.Mail = email.value;
    }
    this._http.sendCode(<JSON>sendDetails).subscribe({ complete: () => {
      this.sent = true;
      if (localStorage.getItem('firstSend')) {
        const firstDate: any = new Date(localStorage.getItem('firstSend')), currDate: any = new Date();
        if (currDate - firstDate < SEND_COOLDOWN) {
          let totalSent: number = parseInt(localStorage.getItem('totalSent'));
          ++totalSent;
          localStorage.setItem('totalSent', '' + totalSent);
          if (totalSent >= MAX_ATTEMPTS) this.allowSend = false;
        }
        else this.resetSentStorage();
      }
      else {
        this.resetSentStorage();
      }
    }});
  }

  resetSentStorage() {
    localStorage.setItem('firstSend', new Date().toString());
    localStorage.setItem('totalSent', '1');
  }
}
