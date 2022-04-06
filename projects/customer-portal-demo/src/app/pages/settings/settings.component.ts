import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  display = false;
  display2 = false;
  name;
  address;
  options;
  selectedOption;
  cols: any;
  tableDate = [
    {
      creditNumber: '4580 **** **** ****',
      expired: '08/25',
    },
    {
      creditNumber: '1234 **** **** ****',
      expired: '03/27',
    },
  ];
  cols2: any;
  tableDate2 = [
    {
      contactType: 'עובד',
      identify: 'תעודת זהות',
    },
    {
      contactType: 'לקוח',
      identify: 'מספר עובד/לקוח',
    },
    {
      contactType: 'אחר',
      identify: 'תעודת זהות',
    },
  ];
  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'creditNumber', header: 'מספר כרטיס אשראי' },
      { field: 'expired', header: 'תוקף' },
      { field: 'removeBtn', header: '' },
    ];
    this.cols2 = [
      { field: 'contactType', header: 'סוג איש קשר' },
      { field: 'identify', header: 'מזהה ראשי' },
      { field: 'removeBtn', header: '' },
    ];
  }
  
}
