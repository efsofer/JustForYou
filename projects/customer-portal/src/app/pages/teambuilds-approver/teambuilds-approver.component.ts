import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';


@Component({
  selector: 'app-teambuilds-approver',
  templateUrl: './teambuilds-approver.component.html',
  styleUrls: ['./teambuilds-approver.component.scss']
})
export class TeambuildsApproverComponent implements OnInit {

  tbpkg: any;
  TBCustsDetails: any = {};
  actionCust: any = {};
  displayApprove = false;
  displayDeny = false;
  displayComplete = false;
  miniLoading = false;
  notes: string = '';
  custsByTBPackageId:any;
  pieData = {
    number: 0,
    title: 'יחידות',
    datasets: [{
      data: [],
      backgroundColor: [
        "#118AB2",
        "#4DAA57",
        "#FFCE56"
      ],
      hoverBackgroundColor: [
        "#118AB2",
        "#4DAA57",
        "#FFCE56"
      ],
    }],
    labels: ['ממתינים לאישור', 'אושרו', 'טרם בחרו']
  };

  constructor(private route: ActivatedRoute, private renderer: Renderer2, private http: HttpService ) { }

  ngOnInit(): void {
    this.tbpkg = this.route.snapshot.data.TBData;
    console.log(this.tbpkg)
    this.pieData.number = this.tbpkg.recipients;
    this.pieData.datasets[0].data = [this.tbpkg.pending, this.tbpkg.chose - this.tbpkg.pending, this.tbpkg.recipients - this.tbpkg.chose];
    this.tbpkg.pieData = this.pieData;
    this.getTBPackageCusts()
  }

  getTBDisplayName(cust: any) {
    if (cust.TeamBuildName) return cust.TeamBuildName;
    if (cust.orderid) return 'מותאם אישית';
    return 'טרם נבחר';
  }

  getTBPackageCusts(){
    this.http.getCustsByTBPackage(this.tbpkg.Id).subscribe(data=>{
      this.custsByTBPackageId = data
    })
  }

  getStatus(status: number) {
    if (status == 1) return 'פתוח';
    if (status == 2) return 'ממתין לאישור';
    if (status == 3) return 'נדחה';
    if (status == 4) return 'בטיפול דור חדש';
    if (status == 5) return 'טיפול הסתיים';
    return '';
  }

  dateFilter(dateStr: string) {
    let testDate = new Date(dateStr);
    if (!testDate || isNaN(testDate.valueOf()) || testDate.valueOf() == 0 || testDate.getFullYear() == 1753) return '';
    return dateStr;
  }

  canAct(cust: any): boolean {
    if (cust.orderid && (cust.Status == 2 || cust.Status == 3)) return true;
    return false;
  }

  expand(event: any, valField: string) {
    let wrapper = event.currentTarget.parentElement.parentElement.parentElement;
    if (wrapper.classList.contains('expanded')) {
      this.renderer.removeClass(wrapper, 'expanded');
      return;
    }
    this.renderer.addClass(wrapper, 'expanded');
    this.renderer.addClass(wrapper, 'loading');
    if (!this.TBCustsDetails[valField]) {
      this.http.validateTB(this.route.snapshot.queryParamMap.get('tbid'), valField).subscribe({
        next: (resp: any) => { if (resp.response) this.TBCustsDetails[valField] = resp.response[0]; },
        complete: () => this.renderer.removeClass(wrapper, 'loading')
      });
    }
    else this.renderer.removeClass(wrapper, 'loading')
  }

  collapse(event: any) {
    event.stopPropagation();
    this.renderer.removeClass(event.currentTarget.parentElement.parentElement, 'expanded');
  }

  doApprove() {
    this.miniLoading = true;
    this.http.doApprove(this.actionCust.orderid, this.displayApprove ? 1 : 0, this.notes).subscribe(
      (res: any) => {
        if (res && res.errdesc && !res.err) {
          if (this.displayApprove) this.actionCust.Status = 4;
          else this.actionCust.Status = 3;
          if (this.TBCustsDetails[this.actionCust.TZ])
            this.TBCustsDetails[this.actionCust.TZ].TBHistory[0].Order[0].Notes += '[[ הערת גורם מאשר: ' + this.notes + ']]';
          this.notes = '';
          this.displayApprove = false;
          this.displayDeny = false;
          this.displayComplete = true;
          this.miniLoading = false;
        }
      }
    )
  }
}
