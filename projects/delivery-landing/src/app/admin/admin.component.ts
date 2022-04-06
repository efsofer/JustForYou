import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

const LOGIN_LENGTH = 1800000; // 30 minutes

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _http: HttpService, private route: ActivatedRoute, private titleService: Title) { }

  vldValue: string = '';
  vldPass: string = '';
  benefits: any;
  allowed: string[] = [];
  entries: any[] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  isPais = false;
  isAdmin = false;
  filterForm!: FormGroup;
  pristine = true;

  ngOnInit(): void {
    this._http.getBenefits().subscribe((data: any) => this._http.allBenefits = data);
    this.titleService.setTitle('הטבות עד הבית - ניהול');
    const frmDate = this.route.snapshot.queryParamMap.get('fromDate');
    this.filterForm = new FormGroup({
      'autoDate': new FormControl(frmDate ? 'range' : 'today'),
      'fromDate': new FormControl({ value: frmDate ? this.formatFromDate(frmDate) : '', disabled: frmDate ? false : true }),
      'toDate': new FormControl({ value: '', disabled: frmDate ? false : true }),
      'package': new FormControl(''),
      'code': new FormControl(),
    });
    if (localStorage.getItem('loginTime')) {
      const now: any = new Date(), lastLogin: any = new Date(localStorage.getItem('loginTime'));
      if (now - lastLogin < LOGIN_LENGTH) {
        this.isLoading = true;
        this._http.token = localStorage.getItem('token');
        this.isPais = localStorage.getItem('id') == '23315';
        this.allowed = localStorage.getItem('allowed').split(',');
        this.isAdmin = localStorage.getItem('adm') ? true : false;
        this.isLoggedIn = true;
        this.getEntries();
        if (!this.isAdmin) this.updateRead();
      }
    }
  }

  onVldSubmit() {
    let token = '', id = 0;
    this._http.loginUser(this.vldValue, this.vldPass).subscribe({
      next: (data: any) => { token = data.Token; id = parseInt(data.dt[0].Id); this.isAdmin = data.dt[0].UserType == 1 ? true : false; },
      error: () => {
        this.isError = true;
        return;
      },
      complete: () => {
        if (!token) {
          this.isError = true;
          return;
        } else {
          if (id == 23315) this.isPais = true;
          if (this.checkBenefit(id, this.isAdmin)) {
            this.isLoading = true;
            this._http.token = token;
            this.isLoggedIn = true;
            this.getEntries();
            localStorage.setItem('loginTime', new Date().toString());
            localStorage.setItem('token', token);
            localStorage.setItem('id', '' + id);
            if (this.isAdmin) localStorage.setItem('adm', '1');
            localStorage.setItem('allowed', this.allowed.join(','));
            if (!this.isAdmin) this.updateRead();
          }
          else this.isError = true;
        }
      }
    });
  }

  updateRead() {
    const frmDate = this.route.snapshot.queryParamMap.get('fromDate');
    if (frmDate) {
      this._http.updateRead(this.formatFromDate(frmDate)).subscribe();
    }
  }

  checkBenefit(id: number, admin: boolean) {
    this.benefits = this._http.allBenefits;
    for (let b in this.benefits) {
      if (!this.isPais && b == 'pais') continue;
      if (this.benefits[b].combined) {
        for (let c_item of this.benefits[b].combined) {
          if ((c_item.id && c_item.id == id) || admin) this.allowed.push(c_item.name);
        }
      }
      else if (this.benefits[b].id == id || admin) {
        if (this.benefits[b].items) {
          for (let item of this.benefits[b].items) this.allowed.push(item.name);
        }
        else this.allowed.push(this.benefits[b].name);
      }
    }
    if (this.allowed.length) return true;
    return false;
  }

  getEntries() {
    this.isLoading = true;
    let temp: any;
    this.entries = [];
    /*if (this.filterForm.pristine) {
      this.autoDate.disable();
      this._http.getEntries().subscribe({
        next: (data) => temp = data, complete: () => {
          this.processEntires(temp); this.autoDate.enable(); this.isLoading = false;
        }
      })
    }
    else {*/
    this.autoDate.disable();
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let fromDate = '', toDate = '', now = new Date();
    if (this.autoDate.value == 'week') {
      now.setDate(now.getDate() - 7);
      fromDate = now.toLocaleDateString('en-GB', dateOptions);
    }
    else if (this.autoDate.value == 'month') {
      now.setDate(1);
      fromDate = now.toLocaleDateString('en-GB', dateOptions);
    }
    else if (this.autoDate.value == 'range') {
      if (this.fromDate.value) fromDate = new Date(this.fromDate.value).toLocaleDateString('en-GB', dateOptions);
      if (this.toDate.value) toDate = new Date(this.toDate.value).toLocaleDateString('en-GB', dateOptions);
    }
    else fromDate = now.toLocaleDateString('en-GB', dateOptions); // today
    this._http.getEntries(this.package.value, this.code.value, fromDate, toDate).subscribe({
      next: (data) => temp = data, complete: () => {
        this.processEntires(temp); this.autoDate.enable(); this.isLoading = false;
      }
    });
  }

  private processEntires(temp: any) {
    if (temp.dt) {
      for (let entry of temp.dt) {
        entry.viewDate = this.formatDate(entry.InsertDate);
        if (this.isPais) {
          const streetSep = entry.ReceiveAddress.indexOf('|'), citySep = entry.ReceiveAddress.lastIndexOf(',');
          entry.street = entry.ReceiveAddress.substring(0, streetSep);
          entry.streetnum = entry.ReceiveAddress.substring(streetSep + 2, citySep);
          entry.city = entry.ReceiveAddress.substring(citySep + 2);
          if (entry.Notes.indexOf('[[') === 0) {
            let end = entry.Notes.indexOf(']]');
            entry.aptnum = entry.Notes.substring(2, end);
            entry.Notes = entry.Notes.substring(end + 2);
          }
          this.entries.push(entry);
        }
        else if (!(this.isAdmin && entry.Package == 'pais')) this.entries.push(entry);
      }
    }
    this.entries.sort(function (x: any, y: any) {
      if (!x.InsertDate) return 1;
      if (!y.InsertDate) return -1;
      return new Date(x.InsertDate) < new Date(y.InsertDate) ? 1 : -1;
    });
    this.isLoading = false;
  }

  private formatFromDate(date: string): string {
    return date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6);
  }

  private formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' '
      + dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    // const dateValues = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear(), dateObj.getHours(), dateObj.getMinutes()], dateLbls = [];
    // for (let num of dateValues) {
    //   if (num < 10) dateLbls.push('0' + num);
    //   else dateLbls.push('' + num);
    // }
    // return dateLbls[0] + '/' + dateLbls[1] + '/' + dateLbls[2] + ' ' + dateLbls[3] + ':' + dateLbls[4];
  }

  dateFilter() {
    if (this.pristine) this.pristine = false;
    if (this.autoDate.value == 'range') {
      this.fromDate.enable();
      this.toDate.enable();
    }
    else {
      this.fromDate.disable();
      this.toDate.disable();
      this.getEntries();
    }
  }

  exportExcel() {
    let tbl = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tbl);
    var C1 = !this.isPais ? XLSX.utils.decode_col("D") : XLSX.utils.decode_col("C");
    var C2 = !this.isPais ? XLSX.utils.decode_col("F") : XLSX.utils.decode_col("E");
    /* get worksheet range */
    var range = XLSX.utils.decode_range(ws['!ref']);
    if (this.isPais) delete (ws['L1']);
    else delete (ws['K1']);
    for (var i = range.s.r + 1; i <= range.e.r; ++i) {
      /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
      var ref = XLSX.utils.encode_cell({ r: i, c: C1 });
      var ref2 = XLSX.utils.encode_cell({ r: i, c: C2 });
      var ref3 = XLSX.utils.encode_cell({ r: i, c: range.e.c - 1 });
      var ref4 = XLSX.utils.encode_cell({ r: i, c: range.e.c });
      /* if the particular row did not contain data for the column, the cell will not be generated */
      if (ws[ref].v) {
        ws[ref].t = 's';
        ws[ref].v = '0' + ws[ref].v;
      }
      if (ws[ref2].v) {
        ws[ref2].t = 's';
        ws[ref2].v = '0' + ws[ref2].v;
      }
      ws[ref3] = ws[ref4];
      ws[ref3].z = 'dd/mm/yyyy hh:mm';
      delete (ws[ref4]);
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    wb.Workbook = { Views: [{}] };
    wb.Workbook.Views[0].RTL = true;
    XLSX.writeFile(wb, 'Orders_' + new Date().toLocaleDateString() + '.xlsx');
  }

  get autoDate() { return this.filterForm.get('autoDate'); }
  get fromDate() { return this.filterForm.get('fromDate'); }
  get toDate() { return this.filterForm.get('toDate'); }
  get package() { return this.filterForm.get('package'); }
  get code() { return this.filterForm.get('code'); }

}