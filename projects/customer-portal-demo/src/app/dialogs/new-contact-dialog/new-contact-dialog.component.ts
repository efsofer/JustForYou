import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  query;
  idNumber;
  contactTypes;
  selectedContactType;
  departments;
  selectedDepartments;
  roles;
  birthday;
  selectedRole;
  startJobDate;
  addeess;
  cities;
  selectedCity;
  zipCode;
  value: any;
  constructor() { }

  ngOnInit(): void {
  }

}
