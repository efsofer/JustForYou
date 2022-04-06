import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-incentives',
  templateUrl: './contacts-incentives.component.html',
  styleUrls: ['./contacts-incentives.component.scss']
})
export class ContactsIncentivesComponent implements OnInit {
  display = false;
  display2 = false;
  name;
  code;
  expDateFrom: any;
  expDateTo: any;
  senders = [
    {name: 'משה כהן'},
    {name: 'מאיה דבש'},
    {name: 'נטלי פישמן'},
    {name: 'יוסי לוי'},
  ];
  selectedSenders = [];
  priceFrom;
  priceTo;
  cols: any;
  tableData = [
    {
      name: 'שמואל תורגמן',
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      birthDate: '01/02/2020',
      couponCode: '123598598',
      orderNumber: '589654788',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '01/02/2020',
      removeBtn: false
    },
    {
      name: 'עו"ד תורגמן',
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      birthDate: '15/04/2019',
      couponCode: '458964898',
      orderNumber: '123456795',
      statusDetails: {
        status:  2,
        couponName: null
      },
      sendDate: '14/05/2019',
      removeBtn: false
    },
    {
      name: 'שלמה קרסנר',
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      birthDate: '25/07/2018',
      couponCode: '589657123',
      orderNumber: '126841531',
      statusDetails: {
        status:  2,
        couponName: null
      },
      sendDate: '25/07/2018',
      removeBtn: false
    },
    {
      name: 'שלומי זעירא',
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      birthDate: '12/09/2018',
      couponCode: '897655282',
      orderNumber: '123598598',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '12/09/2020',
      removeBtn: true
    },
    {
      name: 'חיים מוסקוביץ',
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      birthDate: '01/12/2019',
      couponCode: '123598598',
      orderNumber: '589654788',
      statusDetails: {
        status:  3,
        couponName: 'בוטיק & ספא - סופ"ש פרימיום'
      },
      sendDate: '01/12/2019',
      removeBtn: false
    },
    {
      name: 'רו"ח דניאל סובל',
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      birthDate: '08/08/2020',
      couponCode: '458964898',
      orderNumber: '123598598',
      statusDetails: {
        status:  2,
        couponName: null
      },
      sendDate: '08/08/2020',
      removeBtn: false
    },
    {
      name: 'גלי אפשטיין',
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      birthDate: '20/12/2020',
      couponCode: '589654788',
      orderNumber: '897655282',
      statusDetails: {
        status:  2,
        couponName: null
      },
      sendDate: '20/12/2020',
      removeBtn: true
    },
    {
      name: 'יפעת מלכא',
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      birthDate: '25/07/2019',
      couponCode: '897655282',
      orderNumber: '123598598',
      statusDetails: {
        status:  3,
        couponName: 'שי לפסח'
      },
      sendDate: '25/07/2019',
      removeBtn: false
    },
    {
      name: 'שמואל תורגמן',
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      birthDate: '01/02/2020',
      couponCode: '123598598',
      orderNumber: '589654788',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '01/02/2020',
      removeBtn: true
    },
    {
      name: 'עו"ד תורגמן',
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      birthDate: '15/04/2019',
      couponCode: '458964898',
      orderNumber: '123456795',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '14/05/2019',
      removeBtn: false
    },
    {
      name: 'שלמה קרסנר',
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      birthDate: '25/07/2018',
      couponCode: '589657123',
      orderNumber: '126841531',
      statusDetails: {
        status:  2,
        couponName: null
      },
      sendDate: '25/07/2018',
      removeBtn: false
    },
    {
      name: 'שלומי זעירא',
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      birthDate: '12/09/2018',
      couponCode: '897655282',
      orderNumber: '123598598',
      statusDetails: {
        status:  3,
        couponName: 'בוטיק & ספא - סופ"ש פרימיום'
      },
      sendDate: '12/09/2020',
      removeBtn: false
    },
    {
      name: 'חיים מוסקוביץ',
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      birthDate: '01/12/2019',
      couponCode: '123598598',
      orderNumber: '589654788',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '01/12/2019',
      removeBtn: false
    },
    {
      name: 'רו"ח דניאל סובל',
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      birthDate: '08/08/2020',
      couponCode: '458964898',
      orderNumber: '123598598',
      statusDetails: {
        status:  1,
        couponName: null
      },
      sendDate: '08/08/2020',
      removeBtn: false
    }
  ];
  constructor() { }

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'שם מלא' },
      { field: 'type', header: 'סוג' },
      { field: 'department', header: 'מחלקה' },
      { field: 'role', header: 'תפקיד' },
      { field: 'birthDate', header: 'תאריך לידה' },
      { field: 'couponCode', header: 'קוד שובר' },
      { field: 'orderNumber', header: "מס' הזמנה" },
      { field: 'status', header: 'סטטוס' },
      { field: 'sendDate', header: 'שליחה' },
      { field: 'removeBtn', header: 'הסרה' },
    ];
  }
}
