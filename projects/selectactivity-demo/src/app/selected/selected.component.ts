import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare function j4UCarousel(wrapper: HTMLElement): void;

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  choice = this._http.choice.value;
  sendPhone: boolean = false;
  sendMail: boolean = false;
  sendForm: FormGroup;
  sent: boolean = false;
  expandedActivity: number = 0;

  constructor(private _http: HttpService, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.ids.OrderId || !this._http.ids.ValidationField) {
      this._http.routeTo404();
      return;
    }
    this.sendForm = new FormGroup({
      'phone': new FormControl('', Validators.pattern('^05[0-9]{8}$')),
      'email': new FormControl('', Validators.email)
    }, this.checkSend);
    if (!this.choice.extracharge) {
      this.choice.VCVoucherid = [];
      for (let i = 1; i <= this._http.ids.participants; ++i) {
        this.choice.VCVoucherid.push('620000000' + (i < 10 ? '0' + i : i));
      }
    }
  }

  ngAfterViewInit() {
    j4UCarousel(this.el.nativeElement);
  }

  checkSend(fg: FormGroup) {
    return fg.get('phone').value == '' && fg.get('email').value == '' ? {'noSend': true} : null;
  }
  
  onSendSubmit() {
    this.sent = true;
    /*let sendDetails: any = {
      "OrderId": this._http.ids.OrderId,
      "ValidationField": this._http.ids.ValidationField
    }
    if (this.sendPhone) {
      let phone = this.sendForm.get('phone');
      if (phone.value && phone.valid) sendDetails.Phone = phone.value;
    }
    if (this.sendMail) {
      let email = this.sendForm.get('email');
      if (email.value && email.valid) sendDetails.Mail = email.value;
    }
    this._http.sendCode(<JSON>sendDetails).subscribe({complete: () => this.sent = true});*/
  }
  
  print() {
    this.sendPhone = false;
    this.sendMail = false;
    setTimeout(() => window.print());
  }

}
