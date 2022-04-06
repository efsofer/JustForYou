import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-contact-step',
  templateUrl: './create-contact-step.component.html',
  styleUrls: ['./create-contact-step.component.scss']
})
export class CreateContactStepComponent implements OnInit {
  name;
  contactTypesOptions;
  selectedTypeOption;
  departmentOptions;
  selectedDepartmentOption;
  roleOptions;
  selectedRoleOption;
  birdthdayFrom;
  birdthdayTo;
  startingJobDateFrom;
  startingJobDateTo;

  display = false;
  display2 = false;
  cols: any;
  tableData = [
    {
      name: 'שמואל תורגמן',
      idNumber: 15481571,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '01/02/2020',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד תורגמן',
      idNumber: 15481571,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '15/04/2019',
      birthDate: '15/04/2019',
      city: 'ירושלים'
    },
    {
      name: 'שלמה קרסנר',
      idNumber: 15481571,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '25/07/2018',
      birthDate: '25/07/2018',
      city: 'ירושלים'
    },
    {
      name: 'שלומי זעירא',
      idNumber: 15481571,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '12/09/2018',
      birthDate: '12/09/2018',
      city: 'ירושלים'
    },
    {
      name: 'חיים מוסקוביץ',
      idNumber: 15481571,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '01/12/2019',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      idNumber: 15481571,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '08/08/2020',
      birthDate: '10/08/2020',
      city: 'ירושלים'
    },
    {
      name: 'גלי אפשטיין',
      idNumber: 15481571,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '20/12/2020',
      birthDate: '11/12/2020',
      city: 'ירושלים'
    },
    {
      name: 'יפעת מלכא',
      idNumber: 15481571,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '25/07/2019',
      birthDate: '03/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      idNumber: 15481571,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '01/02/2020',
      birthDate: '01/02/2020',
      city: 'תל אביב'
    },
    {
      name: 'עו"ד תורגמן',
      idNumber: 15481571,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '15/04/2019',
      birthDate: '06/04/2019',
      city: 'ירושלים'
    },
    {
      name: 'שלמה קרסנר',
      idNumber: 15481571,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '25/07/2018',
      birthDate: '25/07/2018',
      city: 'נס-ציונה'
    },
    {
      name: 'שלומי זעירא',
      idNumber: 15481571,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '12/09/2018',
      birthDate: '12/09/2018',
      city: 'רעננה'
    },
    {
      name: 'חיים מוסקוביץ',
      idNumber: 15481571,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '01/12/2019',
      birthDate: '01/12/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'רו"ח דניאל סובל',
      idNumber: 15481571,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '08/08/2020',
      birthDate: '08/08/2020',
      city: 'ירושלים'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'שם מלא' },
      { field: 'idNumber', header: 'תעודת זהות' },
      { field: 'type', header: 'סוג איש קשר' },
      { field: 'department', header: 'מחלקה' },
      { field: 'role', header: 'תפקיד' },
      { field: 'startDate', header: 'כניסה לחברה' },
      { field: 'birthDate', header: 'תאריך לידה' },
      { field: 'city', header: 'יישוב' }
    ];
  }

}
