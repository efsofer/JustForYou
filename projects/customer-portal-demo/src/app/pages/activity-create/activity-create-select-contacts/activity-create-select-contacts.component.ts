import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-create-select-contacts',
  templateUrl: './activity-create-select-contacts.component.html',
  styleUrls: ['./activity-create-select-contacts.component.scss']
})
export class ActivityCreateSelectContactsComponent implements OnInit {
  display = false;
  display2 = false;
  display3 = false;
  selectedValue = 'val1';
  name;
  amount;
  query;
  contactTypes = [
    {name: 'עובדים'},
    {name: 'לקוחות'},
    {name: 'גמלאים'}
  ]
  selectedContactTypes;
  departments = [
    {name: 'שיווק'},
    {name: 'כספים'},
    {name: 'שירות לקוחות'},
    {name: 'הנהלה'}
  ]
  selectedDepartment;
  roles;
  selectedRole;
  birthdayFrom;
  birthdayTo;
  startJobDateFrom;
  startJobDateTo;
  results = [
    {
      quantity: 150,
      contactTypes : ['גמלאים', 'מחלקת שיווק', 'מתכנתים'],
      event: 'כניסה לחברה',
      dateFrom: '01/01/2005',
      dateTo: '01/01/2020',
      isSelected: false
    },
    {
      quantity: 125,
      contactTypes : ['עובדים', 'מחלקת עיצוב'],
      event: 'יום הולדת',
      dateFrom: '01/01/2005',
      dateTo: '01/01/2020',
      isSelected: false
    }
  ];
  mockResults = [
    {
      
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  selectContacts(index) {
    this.results[index].isSelected = true;
  }

  removeContacts(index) {
    this.results[index].isSelected = false;
  }

}
