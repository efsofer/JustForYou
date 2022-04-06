import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-contacts-management',
  templateUrl: './contacts-management.component.html',
  styleUrls: ['./contacts-management.component.scss']
})
export class ContactsManagementComponent implements OnInit {
  name;
  contactType;
  selectedContactType;
  departments;
  selectedDepartment;
  roles;
  selectedRole;
  birdthdayFrom;
  birdthdayTo;
  startJobDateFrom;
  startJobDateTo;
  value;

  display = false;
  display2 = false;
  cols: any;
  tableDate: any
  // tableDate = [
  //   {
  //     name: 'שמואל תורגמן',
  //     idNumber: 15481571,
  //     type: 'גמלאי',
  //     department: 'עיצוב',
  //     role: 'מנכ"ל',
  //     startDate: '01/02/2020',
  //     birthDate: '01/02/2020',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'עו"ד תורגמן',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'תכנות',
  //     role: 'מזכיר החברה',
  //     startDate: '15/04/2019',
  //     birthDate: '15/04/2019',
  //     city: 'ירושלים',
  //     active: 2
  //   },
  //   {
  //     name: 'שלמה קרסנר',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'סמנכ"ל תכנון והנדסה',
  //     startDate: '25/07/2018',
  //     birthDate: '25/07/2018',
  //     city: 'ירושלים',
  //     active: 2
  //   },
  //   {
  //     name: 'שלומי זעירא',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'סמנכ"ל תפעול ואחזקה',
  //     startDate: '12/09/2018',
  //     birthDate: '12/09/2018',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'חיים מוסקוביץ',
  //     idNumber: 15481571,
  //     type: 'לקוח',
  //     department: 'עיצוב',
  //     role: 'סמנכ"ל הקמה',
  //     startDate: '01/12/2019',
  //     birthDate: '01/12/2019',
  //     city: 'ירושלים',
  //     active: 2
  //   },
  //   {
  //     name: 'רו"ח דניאל סובל',
  //     idNumber: 15481571,
  //     type: 'גמלאי',
  //     department: 'תכנות',
  //     role: 'מנהל מסחרי ופיתוח עסקי',
  //     startDate: '08/08/2020',
  //     birthDate: '10/08/2020',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'גלי אפשטיין',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'מבקרת פנים',
  //     startDate: '20/12/2020',
  //     birthDate: '11/12/2020',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'יפעת מלכא',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'מנכ"ל',
  //     startDate: '25/07/2019',
  //     birthDate: '03/07/2019',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'שמואל תורגמן',
  //     idNumber: 15481571,
  //     type: 'גמלאי',
  //     department: 'עיצוב',
  //     role: 'מנכ"ל',
  //     startDate: '01/02/2020',
  //     birthDate: '01/02/2020',
  //     city: 'תל אביב',
  //     active: 1
  //   },
  //   {
  //     name: 'עו"ד תורגמן',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'תכנות',
  //     role: 'מזכיר החברה',
  //     startDate: '15/04/2019',
  //     birthDate: '06/04/2019',
  //     city: 'ירושלים',
  //     active: 1
  //   },
  //   {
  //     name: 'שלמה קרסנר',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'סמנכ"ל תכנון והנדסה',
  //     startDate: '25/07/2018',
  //     birthDate: '25/07/2018',
  //     city: 'נס-ציונה',
  //     active: 2
  //   },
  //   {
  //     name: 'שלומי זעירא',
  //     idNumber: 15481571,
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'סמנכ"ל תפעול ואחזקה',
  //     startDate: '12/09/2018',
  //     birthDate: '12/09/2018',
  //     city: 'רעננה',
  //     active: 1
  //   },
  //   {
  //     name: 'חיים מוסקוביץ',
  //     idNumber: 15481571,
  //     type: 'לקוח',
  //     department: 'עיצוב',
  //     role: 'סמנכ"ל הקמה',
  //     startDate: '01/12/2019',
  //     birthDate: '01/12/2019',
  //     city: 'פתח תקווה',
  //     active: 1
  //   },
  //   {
  //     name: 'רו"ח דניאל סובל',
  //     idNumber: 15481571,
  //     type: 'גמלאי',
  //     department: 'תכנות',
  //     role: 'מנהל מסחרי ופיתוח עסקי',
  //     startDate: '08/08/2020',
  //     birthDate: '08/08/2020',
  //     city: 'ירושלים',
  //     active: 2
  //   }
  // ];
  isLoading = true
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getCusts()
    this.cols = [
      { field: 'name', header: 'שם מלא' },
      { field: 'idNumber', header: 'תעודת זהות' },
      { field: 'type', header: 'סוג איש קשר' },
      { field: 'department', header: 'מחלקה' },
      { field: 'role', header: 'תפקיד' },
      { field: 'startDate', header: 'כניסה לחברה' },
      { field: 'birthDate', header: 'תאריך לידה' },
      { field: 'city', header: 'עיר' },
      { field: 'active', header: `פעיל?` },
    ];
  }

  getCusts() {
    this.isLoading = true
    this.http.getCustsById().subscribe(data => {
      this.tableDate = data
      this.isLoading = false
    })

  }
  search() {
    this.isLoading = true
    this.http.getAllCusts(this.contactType, this.selectedDepartment, this.selectedRole, this.birdthdayFrom,
      this.birdthdayTo, this.startJobDateFrom, this.startJobDateTo, this.value).subscribe(data => {
        this.tableDate = data
        this.isLoading = false
      })
  }
}
