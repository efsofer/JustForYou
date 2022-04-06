import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { last } from 'rxjs/operators';

//declare function j4UCarousel(wrapper: HTMLElement): void;

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  employee = this._http.employee.value;
  choice: any;
  sent: boolean = false;
  expandedItem: number = 0;
  hasCodes: boolean = false;
  withApprover: boolean = false;
  showNotes = false;
  approverTitle = this._http.ids.PackageId == 'Ahwnx0k1qPJ4t6Ce_FNjyw2' ? 'תקציבאי' : 'מנהל';
  lastNote: any = {};
  updateForm = false;
  updateSuccess: number = 0;
  isLoading: boolean = false;
  newParticipants: string = '';
  newDate: string = '';
  newNotes: string = '';

  /*sendForm: FormGroup;
  sendPhone: boolean = false;
  sendMail: boolean = false;*/

  constructor(private _http: HttpService, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.ids.PackageId || !this._http.ids.ValidationField) {
      this._http.routeTo('');
      return;
    }
    this.withApprover = this._http.worksWithApprover || this.employee.ApproverEmail;
    this.choice = this.employee.TBHistory[0];
    if (!this.choice.id) {
      this.choice.TeamBuildItems = [];
      let temp = [];
      for (let line of this.choice.Lines) {
        if (!temp.includes(line.itemid)) {
          temp.push(line.itemid);
          let item = {
            Name: line.Name,
            image1: line.Picture1
          }
          this.choice.TeamBuildItems.push(item);
        }
      }
    }
    /*let baseNotes: string = this.choice.Order[0].Notes, start = baseNotes.lastIndexOf(']');
    this.choice.Notes = baseNotes.substring((start !== -1) ? start + 2 : 0);*/
    if (this.withApprover) {
      this.getLastNote();
      this.newParticipants = this.employee.Participants;
      this.newDate = this.formatDate(new Date(this.employee.PreferredDate));
    }
    if (this.choice.Lines[0].Voucherid) this.hasCodes = true;
    if (this.hasCodes && this.employee.Phone) {
      for (let line of this.choice.Lines) {
        this._http.sendSMS(this.employee.Name, line.itemid, line.Name, line.Voucherid, this.employee.Phone).subscribe({complete: () => {this.sent = true;}});
      }
    }

    /*this.sendForm = new FormGroup({
      'phone': new FormControl('', Validators.pattern('^05[0-9]{8}$')),
      'email': new FormControl('', Validators.email)
    }, this.checkSendValidator);*/
  }

  getLastNote() {
    this.choice.Order[0].Notes = this.choice.Order[0].Notes.trim();
    if (this.employee.Status == 2) {
      let start = this.choice.Order[0].Notes.lastIndexOf(']]');
      if (start !== -1) start += 2;
      else if (this.choice.Order[0].Notes.indexOf('אתר גיבושים-') === 0) start = 12;
      this.lastNote = {note: this.choice.Order[0].Notes.substring(start), approver: 0};
    }
    else if (this.employee.Status == 3) {
      let start = this.choice.Order[0].Notes.lastIndexOf('[[') + 19;
      let end = this.choice.Order[0].Notes.lastIndexOf(']]');
      this.lastNote = {note: this.choice.Order[0].Notes.substring(start, end), approver: 1};
    }
    else {
      let end = this.choice.Order[0].Notes.lastIndexOf(']]');
      if (end !== -1) {
        if ((end + 2) == this.choice.Order[0].Notes.length) {
          let start = this.choice.Order[0].Notes.lastIndexOf('[[') + 19;
          if (start < end) this.lastNote = {note: this.choice.Order[0].Notes.substring(start, end), approver: 1};
          else {
            start -= 19;
            end = start;
            start = this.choice.Order[0].Notes.substring(0, end).lastIndexOf(']]');
            if (start === -1) {
              start = 0;
              if (this.choice.Order[0].Notes.indexOf('אתר גיבושים-') === 0) start = 12;
            }
            else start += 2;
            this.lastNote = {note: this.choice.Order[0].Notes.substring(start, end), approver: 0};
          }
        }
        else {
          let start = end + 2;
          this.lastNote = {note: this.choice.Order[0].Notes.substring(start), approver: 0};
        }
      }
      else this.lastNote = {note: '', approver: 0};
    }
  }

  doUpdate() {
    this.isLoading = true;
    this.updateSuccess = 0;
    this._http.updateUser(this.newParticipants, this.stringToDate(this.newDate, true), this.newNotes).subscribe({
      next: (res: any) => {
        if (res && res.errdesc && !res.err) {
          this.employee.Participants = this.newParticipants;
          let tempDate = new Date(this.newDate);
          if (tempDate && tempDate.valueOf() > 0) this.employee.PreferredDate = tempDate;
          this.choice.Order[0].Notes += '\n' + this.newNotes;
          this.updateSuccess = 1;
          this.updateForm = false;
          this.isLoading = false;
          setTimeout(() => {
            this.updateSuccess = 0;
          }, 3000);
        }
        else if (res.err) {
          this.updateSuccess = 2;
          this.isLoading = false;
        }
      }, error: () => {this.updateSuccess = 2; this.isLoading = false;}
    })
  }

  formatDate(date: Date) {
    if (!date || date.valueOf() == 0 || date.getFullYear() == 1753) return '';
    let year = date.getFullYear(), month = '' + (date.getMonth() + 1), day = '' + date.getDate();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return year + '-' + month + '-' + day;
  }

  stringToDate(dateStr: string, enUs: boolean = false) {
    if (!dateStr) return '';
    const comps = dateStr.split('-');
    if (!enUs) return ' תאריך מועדף: ' + comps[2] + '/' + comps[1] + '/' + comps[0];
    return comps[1] + '/' + comps[2] + '/' + comps[0];
  }

  /*checkSendValidator: ValidatorFn = (fg: AbstractControl): ValidationErrors | null => {
      return fg.get('phone').value == '' && fg.get('email').value == '' ? {noSend: true} : null;
  };
  
  onSendSubmit() {
    let sendDetails: any = {
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
    this._http.sendCode(<JSON>sendDetails).subscribe({complete: () => this.sent = true});
  }
  
  print() {
    this.sendPhone = false;
    this.sendMail = false;
    setTimeout(() => window.print());
  }*/

}
