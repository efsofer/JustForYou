import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { Cust } from 'src/app/interfaces';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  private _cust: Cust;
  @Input() set cust(value: Cust) {
    if (!value) return;
    this._cust = value;
    this.updateValues();
  }
  get cust(): Cust {
    return this._cust;
  }

  custForm: FormGroup;
  isPristine = true;
  showErrors = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.custForm = new FormGroup({
      'TZ': new FormControl({value: '', disabled: true}),
      'custName': new FormControl(),
      'phone': new FormControl('', Validators.pattern('^((05[0-9]{8})|(05[0-9]\-[0-9]{7}))$')),
      'mail': new FormControl('', Validators.email),
      'origSendDate': new FormControl(),
      'chooseDate': new FormControl({value: '', disabled: true}),
      'lastSent': new FormControl({value: '', disabled: true}),
      'mngMail': new FormControl('', Validators.email),
    });
  }

  updateValues() {
    this.isPristine = true;
    this.custForm.get('origSendDate').enable();
    if (this.cust) {
      this.custForm.get('TZ').setValue(this.cust.TZ);
      this.custForm.get('custName').setValue(this.cust.Name);
      this.custForm.get('phone').setValue(this.cust.Phone);
      this.custForm.get('mail').setValue(this.cust.Email);
      this.custForm.get('origSendDate').setValue(new Date(this.cust.OrigSendDate));
      this.custForm.get('chooseDate').setValue(this.formatDate(this.cust.OrgChoosedDate));
      this.custForm.get('lastSent').setValue(this.formatDate(this.cust.LastSendDate));
      this.custForm.get('mngMail').setValue(this.cust.MenagerEmail);
      if (this.cust.OrigSendDate && new Date(this.cust.OrigSendDate) < new Date()) {
        this.isPristine = false;
        this.custForm.get('origSendDate').setValue(this.formatDate(this.cust.OrigSendDate));
        this.custForm.get('origSendDate').disable();
      }
    }
  }

  formatDate(value: any) {
    let testDate = new Date(value);
    if (!testDate || isNaN(testDate.valueOf()) || testDate.valueOf() == 0 || testDate.getFullYear() == 1753) return '';
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return testDate.toLocaleString('en-GB', dateOptions);
  }

  submitForm(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.showErrors = false;
      if (this.custForm.invalid) {
        this.showErrors = true;
        reject();
      }
      else if (!this.custForm.dirty) resolve(this.custForm.value);
      else this.http.updateCust(this.cust.Custid, this.custName.value, this.phone.value, this.mail.value, this.mngMail.value, this.custForm.get('origSendDate').value)
      .subscribe((resp: any) => {
        if (resp && !resp.err) {
          resolve(this.custForm.value);
        }
      });
    });
  }

  get custName() { return this.custForm.get('custName'); }
  get phone() { return this.custForm.get('phone'); }
  get mail() { return this.custForm.get('mail'); }
  get mngMail() { return this.custForm.get('mngMail'); }

}
