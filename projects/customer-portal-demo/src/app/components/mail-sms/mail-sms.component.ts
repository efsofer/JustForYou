import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-sms',
  templateUrl: './mail-sms.component.html',
  styleUrls: ['./mail-sms.component.scss']
})
export class MailSmsComponent implements OnInit {
  display = false;
  display2 = false;
  display3 = false;
  checked: boolean = false;
  checked2: boolean = true;
  selectedSentences;
  sentences;
  text;
  smsText;
  constructor() {
    this.sentences = [
      {label: 'חג שמח', value: 'חג שמח'},
      {label: 'חג אורים שמח', value: 'חג אורים שמח'},
      {label: 'מועדים לשמחה', value: 'מועדים לשמחה'},
      {label: 'יום הולדת שמח', value: 'יום הולדת שמח'}
    ];

   }

  ngOnInit(): void {
  }

}
