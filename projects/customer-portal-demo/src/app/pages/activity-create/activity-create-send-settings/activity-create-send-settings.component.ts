import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-create-send-settings',
  templateUrl: './activity-create-send-settings.component.html',
  styleUrls: ['./activity-create-send-settings.component.scss']
})
export class ActivityCreateSendSettingsComponent implements OnInit {
  selectedValue = 'val1';
  date;
  amountLimit;
  options;
  selectedOption;
  constructor() { }

  ngOnInit(): void {
  }

}
