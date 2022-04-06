import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

//declare function j4UCarousel(wrapper: HTMLElement): void;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  employee: any = this._http.employee.value;
  package: any;
  expandedItem: number = 0;
  chosen: boolean = false;
  participants: string = '';
  phone: string = '';
  email: string = '';
  gibushDate: string = '';
  notes: String = '';
  isLoading: boolean = false;
  isError: boolean = false;
  pageReady: boolean = false;

  constructor(private _http: HttpService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    if (!this._http.ids.PackageId || !this._http.ids.ValidationField) {
      this._http.routeTo('');
      return;
    }
    this.participants = this.employee.Participants ? this.employee.Participants : '';
    this.phone = this.employee.Phone ? this.employee.Phone : '';
    this.email = this.employee.Email ? this.employee.Email : '';
    this.package = this._http.getPackage().subscribe({
      next: (data: any) => this.package = data.response[0],
      complete: () => { this.pageReady = true; this._http.worksWithApprover = this.package.WorksWithApprover; console.log(this.package.WorksWithApprover);}
    });
  }

  expand(event: any) {
    let wrapper = event.currentTarget.closest('.gift-wrapper');
    this.renderer.addClass(wrapper, 'expanded');
    //setTimeout(() => j4UCarousel(wrapper));
  }

  expandPackage(event: any, item: any) {
    this.chosen = false;
    let wrapper = event.currentTarget.closest('.gift-wrapper');
    this.renderer.addClass(wrapper, 'expanded');
    this.expandedItem = 0;
  }

  collapse(event: any) {
    event.stopPropagation();
    this.isError = false;
    this.renderer.removeClass(event.currentTarget.closest('.gift-wrapper'), 'expanded');
  }

  closePackage(event: any) {
    event.stopPropagation();
    if (event.currentTarget != event.target) return;
    this.isError = false;
    this.chosen = false;
    this.renderer.removeClass(event.currentTarget.closest('.gift-wrapper'), 'expanded');
  }

  openParty() {
    this.chosen = true;
  }

  doChoice(activity: any) {
    this.isError = false;
    this.isLoading = true;
    let choice: any = {
      PackageId: this._http.ids.PackageId,
      ValidationField: this._http.ids.ValidationField,
      TeamBuilId: activity.id,
      WithExtra: activity.ExtraPay ? true : false,
      Qty: this.participants,
      //Notes: '[גיבושון ' + activity.id + ' - ' + activity.name + ', טלפון: ' + this.phone + ']' + this.stringToDate(this.gibushDate),
      Notes: this.notes,
      Phone: this.phone,
      Email: this.email,
      PreferredDate: this.stringToDate(this.gibushDate, true)
    };

    this._http.doChoice(<JSON>choice).subscribe({
      error: () => { this.isError = true; this.isLoading = false; },
      complete: () => this._http.validateEmployee(<JSON>this._http.ids)
        .subscribe({
          next: (data: any) => this._http.employee.next(data.response[0]), complete: () =>
            this.router.navigate(['/selected'], {
              queryParams: { id: this._http.ids.PackageId }
            })
        })
    });
  }

  formatDate(date: Date) {
    let year = date.getFullYear(), month = '' + (date.getMonth() + 1), day = '' + date.getDate();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return year + '-' + month + '-' + day;
  }

  stringToDate(dateStr: string, enUs: boolean = false) {
    if (!dateStr) return '';
    const comps = dateStr.split('-');
    if (!enUs) return ' תאריך מועדף: ' + comps[2] + '/' + comps[1] + '/' + comps[0];
    return comps[1] + '/' + comps[2] + '/' + comps[0];
  }

}
