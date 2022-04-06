import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewContactDialogComponent } from 'src/app/dialogs/new-contact-dialog/new-contact-dialog.component';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute } from '@angular/router';
import { Cust } from 'src/app/interfaces';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { AddNewEmployeeDialogComponent } from 'src/app/dialogs/add-new-employee-dialog/add-new-employee-dialog.component';
import { InfoDialogComponent } from 'src/app/dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-contacts-activities',
  templateUrl: './contacts-activities.component.html',
  styleUrls: ['./contacts-activities.component.scss']
})
export class ContactsActivitiesComponent implements OnInit {
  @Input() data: Cust[];
  @Input() reason: string = 'מתנות ימי הולדת';
  @Input() availableCustomersCount;
  @ViewChild('editCustDlg') formDlg: NewContactDialogComponent;

  display = false;
  display2 = false;
  display3 = false;
  displayComplete = false;
  name: any;
  phone: any;
  email: any;
  tz: any;
  code: any;
  dateFrom: any;
  dateTo: any;
  cols: any;
  selectedCusts: Cust[] = [];
  editedCust: Cust;
  isLoading = true;
  miniLoading = false;
  completeTitle = '';
  excelExport = false;
  removed: boolean;
  canRemove: boolean = false;
  activityId: any;
  custsById: any;
  constructor(private http: HttpService, private router: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.activityId = this.router.snapshot.queryParamMap.get('id')
    this.custsById = this.data;

    this.getCustsById();
    this.cols = [
      { field: 'TZ', header: 'ת.ז/מספר עובד' },
      { field: 'Name', header: 'שם העובד/ת' },
      { field: 'Phone', header: 'טלפון' },
      { field: 'Email', header: 'מייל' },
      { field: 'OrigSendDate', header: 'תאריך לידה' },
      // { field: 'MenagerEmail', header: 'מייל מנהל' },
      { field: 'status', header: 'סטטוס' },
      { field: 'itemName', header: "שובר נבחר" },
      { field: 'VoucherId', header: 'קוד שובר' },
      // { field: 'OrgChoosedDate', header: 'תאריך בחירה' },
      { field: 'removeBtn', header: 'הסרה' },
    ];
  }
  ngAfterViewInit() {
    /*for (let cust of this.data) {
      if (new Date(cust.OrgChoosedDate).getFullYear() == 1753) {
        cust.OrgChoosedDate = null;
      }
    }*/
    this.data.sort(function (a, b) {
      return new Date(b.OrigSendDate).valueOf() - new Date(a.OrigSendDate).valueOf();
    });
    this.isLoading = false;
  }
  getCustsById() {


    this.http.getCustsByIdActivity(this.http.activityId).subscribe(data => {
      this.custsById = data['returnobj'][0].Custs;
      this.data = data['returnobj'][0].Custs;
      this.isLoading = false;
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
  filterDate(dateStr: string): string {
    if (new Date(dateStr).getFullYear() == 1753) return "";
    return dateStr;
  }
  search() {
    this.isLoading = true
    this.http.getCustsById(this.http.activityId, "", this.name, this.phone, this.email, this.code, this.dateFrom, this.dateTo).subscribe(data => {
      this.custsById = data
      this.name = this.phone = this.email = this.code = this.dateFrom = this.dateTo = ""
    })

    this.http.getCustsById(this.http.activityId, "", this.name, this.phone, this.email, this.code, this.dateFrom, this.dateTo)
      .subscribe({
        next: (res: any) => this.data = res.returnobj ? res.returnobj[0].Custs : this.data,
        complete: () => this.isLoading = false
      }
      );
    this.name = this.phone = this.email = this.code = this.tz = this.dateFrom = this.dateTo = ""

  }
  removeCust(id) {
    this.http.removeCust(id).subscribe(data => {
      this.removed = true
      this.search()
    })

  }
  Resend() {
    this.miniLoading = true;
    if (this.selectedCusts.length == 0) {
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
  exportExcel() {
    this.excelExport = true;
    setTimeout(() => {
      let tbl = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tbl);
      var C0 = XLSX.utils.decode_col("A");
      var C1 = XLSX.utils.decode_col("C");
      var C2 = XLSX.utils.decode_col("E");
      var C3 = XLSX.utils.decode_col("F");
      var C4 = XLSX.utils.decode_col("G");
      var C5 = XLSX.utils.decode_col("K");
      /* get worksheet range */
      var range = XLSX.utils.decode_range(ws['!ref']);
      for (var i = range.s.r + 1; i <= range.e.r; ++i) {
        /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
        var ref0 = XLSX.utils.encode_cell({ r: i, c: C0 });
        var ref1 = XLSX.utils.encode_cell({ r: i, c: C1 });
        var ref2 = XLSX.utils.encode_cell({ r: i, c: C2 });
        var ref3 = XLSX.utils.encode_cell({ r: i, c: C3 });
        var ref4 = XLSX.utils.encode_cell({ r: i, c: C4 });
        var ref5 = XLSX.utils.encode_cell({ r: i, c: C5 });
        /* if the particular row did not contain data for the column, the cell will not be generated */
        ws[ref0].z = '@';
        ws[ref0].t = 's';
        if (ws[ref1].v) {
          ws[ref1].z = '@';
          ws[ref1].t = 's';
          if (!isNaN(ws[ref1].v)) ws[ref1].v = '0' + ws[ref1].v;
        }
        ws[ref2].z = 'dd/mm/yyyy hh:mm';
        ws[ref3].z = 'dd/mm/yyyy hh:mm';
        ws[ref4].z = 'dd/mm/yyyy hh:mm';
        ws[ref5].z = '@';
        ws[ref5].t = 's';
      }
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      wb.Workbook = { Views: [{}] };
      wb.Workbook.Views[0].RTL = true;
      XLSX.writeFile(wb, 'Report_' + new Date().toLocaleDateString() + '.xlsx');
      setTimeout(() => { this.excelExport = false; }, 1000);
    }, 1);
  }

  addNewEmpployee() {
    this.dialog.open(AddNewEmployeeDialogComponent, {
      data: { activityId: this.http.activityId }
    }).afterClosed().subscribe(dialogResponse => {

      if (dialogResponse.result.errdesc == 'OK') {

        this.getCustsById();
        this.dialog.open(InfoDialogComponent, {
          data: { message: 'לקוח נשמר בהצלחה' }
        })
      }
      else {
        this.dialog.open(InfoDialogComponent, {
          data: { message: 'לא נשמר' }
        })
      }
    })
  }
}
