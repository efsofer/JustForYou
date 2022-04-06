import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cust } from 'src/app/interfaces';

@Component({
  selector: 'app-contacts-coupons',
  templateUrl: './contacts-coupons.component.html',
  styleUrls: ['./contacts-coupons.component.scss']
})
export class ContactsCouponsComponent implements OnInit {
  @Output() startProgress = new EventEmitter();
  display = false;
  name;
  code;
  expDateFrom: any;
  expDateTo: any;
  phone: any;
  email: any;
  cols: any;
  miniLoading: boolean=false;
  formDlg: any;

  display2 = false;
  display3 = false;
  displayComplete = false;
  tz: any;
  dateFrom: any;
  dateTo: any;
  selectedCusts: Cust[] = [];
  editedCust: Cust;
  isLoading = true;
  completeTitle = '';
  excelExport = false;
  removed: boolean;
  canRemove: boolean = false;
  activityId: any;
  custsById: any;
  // tableDate = [
  //   {
  //     name: 'שמואל תורגמן',
  //     type: 'גמלאי',
  //     department: 'עיצוב',
  //     role: 'מנכ"ל',
  //     birthDate: '01/02/2020',
  //     couponCode: '123598598',
  //     orderNumber: '589654788',
  //     sendDate: '01/02/2020',
  //   },
  //   {
  //     name: 'עו"ד תורגמן',
  //     type: 'עובד',
  //     department: 'תכנות',
  //     role: 'מזכיר החברה',
  //     birthDate: '15/04/2019',
  //     couponCode: '458964898',
  //     orderNumber: '123456795',
  //     sendDate: '14/05/2019',
  //   },
  //   {
  //     name: 'שלמה קרסנר',
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'סמנכ"ל תכנון והנדסה',
  //     birthDate: '25/07/2018',
  //     couponCode: '589657123',
  //     orderNumber: '126841531',
  //     sendDate: '25/07/2018',
  //   },
  //   {
  //     name: 'שלומי זעירא',
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'סמנכ"ל תפעול ואחזקה',
  //     birthDate: '12/09/2018',
  //     couponCode: '897655282',
  //     orderNumber: '123598598',
  //     sendDate: '12/09/2020',
  //   },
  //   {
  //     name: 'חיים מוסקוביץ',
  //     type: 'לקוח',
  //     department: 'עיצוב',
  //     role: 'סמנכ"ל הקמה',
  //     birthDate: '01/12/2019',
  //     couponCode: '123598598',
  //     orderNumber: '589654788',
  //     sendDate: '01/12/2019',
  //   },
  //   {
  //     name: 'רו"ח דניאל סובל',
  //     type: 'גמלאי',
  //     department: 'תכנות',
  //     role: 'מנהל מסחרי ופיתוח עסקי',
  //     birthDate: '08/08/2020',
  //     couponCode: '458964898',
  //     orderNumber: '123598598',
  //     sendDate: '08/08/2020',
  //   },
  //   {
  //     name: 'גלי אפשטיין',
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'מבקרת פנים',
  //     birthDate: '20/12/2020',
  //     couponCode: '589654788',
  //     orderNumber: '897655282',
  //     sendDate: '20/12/2020',
  //   },
  //   {
  //     name: 'יפעת מלכא',
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'מנכ"ל',
  //     birthDate: '25/07/2019',
  //     couponCode: '897655282',
  //     orderNumber: '123598598',
  //     sendDate: '25/07/2019',
  //   },
  //   {
  //     name: 'שמואל תורגמן',
  //     type: 'גמלאי',
  //     department: 'עיצוב',
  //     role: 'מנכ"ל',
  //     birthDate: '01/02/2020',
  //     couponCode: '123598598',
  //     orderNumber: '589654788',
  //     sendDate: '01/02/2020',
  //   },
  //   {
  //     name: 'עו"ד תורגמן',
  //     type: 'עובד',
  //     department: 'תכנות',
  //     role: 'מזכיר החברה',
  //     birthDate: '15/04/2019',
  //     couponCode: '458964898',
  //     orderNumber: '123456795',
  //     sendDate: '14/05/2019',
  //   },
  //   {
  //     name: 'שלמה קרסנר',
  //     type: 'עובד',
  //     department: 'משאבי אנוש',
  //     role: 'סמנכ"ל תכנון והנדסה',
  //     birthDate: '25/07/2018',
  //     couponCode: '589657123',
  //     orderNumber: '126841531',
  //     sendDate: '25/07/2018',
  //   },
  //   {
  //     name: 'שלומי זעירא',
  //     type: 'עובד',
  //     department: 'אחרים',
  //     role: 'סמנכ"ל תפעול ואחזקה',
  //     birthDate: '12/09/2018',
  //     couponCode: '897655282',
  //     orderNumber: '123598598',
  //     sendDate: '12/09/2020',
  //   },
  //   {
  //     name: 'חיים מוסקוביץ',
  //     type: 'לקוח',
  //     department: 'עיצוב',
  //     role: 'סמנכ"ל הקמה',
  //     birthDate: '01/12/2019',
  //     couponCode: '123598598',
  //     orderNumber: '589654788',
  //     sendDate: '01/12/2019',
  //   },
  //   {
  //     name: 'רו"ח דניאל סובל',
  //     type: 'גמלאי',
  //     department: 'תכנות',
  //     role: 'מנהל מסחרי ופיתוח עסקי',
  //     birthDate: '08/08/2020',
  //     couponCode: '458964898',
  //     orderNumber: '123598598',
  //     sendDate: '08/08/2020',
  //   }
  // ];

  constructor(private http: HttpService) { }
  orderCusts:any;
  ngOnInit(): void {
  this.getOrderCusts()
    this.cols = [
      { field: 'name', header: 'שם מלא' },
      { field: 'type', header: 'סוג' },
      { field: 'department', header: 'מחלקה' },
      { field: 'role', header: 'תפקיד' },
      { field: 'birthDate', header: 'תאריך לידה' },
      { field: 'couponCode', header: 'קוד שובר' },
      { field: 'orderNumber', header: "מס' הזמנה" },
      { field: 'sendDate', header: 'תאריך שליחה' },
      { field: 'sendBtn', header: '' },
    ];
  }

  startSteps() {
    this.startProgress.emit(true);
  }
  getOrderCusts(){
    this.isLoading=true
    this.http.getCustsById("",this.http.orderid,"","","","","","").subscribe(data=>{
      this.orderCusts = data 
      this.isLoading=false
    })
  }
  search(){
    this.isLoading=true
    this.http.getCustsById("",this.http.orderid,this.name,this.phone,this.email,this.code,this.expDateFrom,this.expDateTo).subscribe(data=>{
      this.orderCusts = data
      this.name=this.phone=this.email=this.code=this.expDateFrom=this.expDateTo=""
      this.isLoading=false
    })
  }
  getStatus(cust: Cust): string {

    if (cust.OrgChoosedDate && new Date(cust.OrgChoosedDate).getFullYear() != 1753) {
      this.canRemove = false;
      return 'שובר נבחר';
    }
    else if (cust.OrigSendDate && new Date(cust.OrigSendDate) < new Date()) {
      this.canRemove = false;
      return 'נשלח';
    }
    this.canRemove = true;
    return 'פעיל';
  }
  Resend() {
    this.miniLoading = true;
    if (this.selectedCusts.length == 0){
      this.miniLoading = false;
      this.display = false;
        this.display2 = false;
      return;
    } 
    let custIds = '' + this.selectedCusts[0].Custid;
    for (let i = 1; i < this.selectedCusts.length; ++i) {
      custIds += ', ' + this.selectedCusts[i].Custid;
    }
    this.http.Resend(custIds).subscribe((res: any) => {
      if (res.returnobj) {
        this.miniLoading = false;
        this.selectedCusts = [];
        this.display = false;
        this.display2 = false;
        this.completeTitle = 'שליחה חוזרת לנבחרים';
        this.displayComplete = true;
      }
    });
  }
  updateCust(resend: boolean = false) {
    this.miniLoading = true;
    this.formDlg.submitForm().then((formValues) => {
      this.editedCust.Name = formValues['custName'];
      this.editedCust.Phone = formValues['phone'];
      this.editedCust.Email = formValues['mail'];
      this.editedCust.MenagerEmail = formValues['mngMail'];
      this.editedCust.OrigSendDate = formValues['origSendDate'];
      if (resend) {
        this.selectedCusts = [this.editedCust];
        this.Resend();
      }
      else {
        this.miniLoading = false;
        this.display2 = false;
        this.completeTitle = 'עדכון פרטי עובד/ת';
        this.displayComplete = true;
      }
    }, () => this.miniLoading = false);
  }
}
