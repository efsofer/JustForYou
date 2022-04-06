import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-incentives-management',
  templateUrl: './incentives-management.component.html',
  styleUrls: ['./incentives-management.component.scss']
})
export class IncentivesManagementComponent implements OnInit {
  haveDealers = true;
  dealers: any;
  massage:any
  cols: any;
  // tableDate = [
  //   {
    
  //     name: 'משה כהן - מחלקת שיווק',
  //     date: '12/01/2020',
  //     budget: '2000',
  //     used: '470',
  //     balance: '1530',
  //     vouchers: '7',
  //     view: 'https://www.just4u.co.il//SelectGiftNew?id=qsiWxhyvWeDx1ue0bbIYHQ2'
  //   },
  //   {
  //     name: 'מאיה דבש - מחלקת כספים',
  //     date: '12/01/2020',
  //     budget: '2500',
  //     used: '764',
  //     balance: '1736',
  //     vouchers: '10',
  //     view: 'https://www.just4u.co.il//SelectGiftNew?id=qsiWxhyvWeDx1ue0bbIYHQ2'
  //   },
  //   {
  //     name: 'נטלי פישמן - שירות לקוחות',
  //     date: '13/01/2020',
  //     budget: '1400',
  //     used: '1000',
  //     balance: '400',
  //     vouchers: '8',
  //     view: 'https://www.just4u.co.il//SelectGiftNew?id=qsiWxhyvWeDx1ue0bbIYHQ2'
  //   },
  //   {
  //     name: 'יוסי לוי - פיתוח עסקי',
  //     date: '14/01/2020',
  //     budget: '1800',
  //     used: '530',
  //     balance: '1270',
  //     vouchers: '5',
  //     view: 'https://www.just4u.co.il//SelectGiftNew?id=qsiWxhyvWeDx1ue0bbIYHQ2'
  //   }
  // ];
  TotalObligo: any;
  TotalUsed: any;
  TotalBalance: any;
  TotalSent: any;
  tableDate:any;
  constructor(private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.loadDealers()
    this.cols = [
      { field: 'name', header: 'שם' },
      { field: 'date', header: 'תאריך יצירה' },
      { field: 'budget', header: 'תקציב מקורי' },
      { field: 'used', header: 'נוצל' },
      { field: 'balance', header: 'יתרה' },
      { field: 'vouchers', header: 'שוברים שנשלחו' }//,
   //  { field: 'view', header: 'צפייה' },
    ];
  }
  loadDealers() {
    this.http.getMultipleChoice().subscribe(data => {
      this.dealers = data
      if (this.dealers.returnobj == null){
          this.haveDealers = false;
          this.massage=' '
      } 
      else{
        this.TotalObligo=this.dealers.returnobj[0]['Total'][0].TotalObligo;
        this.TotalUsed=this.dealers.returnobj[0]['Total'][0].TotalUsed;
        this.TotalBalance=this.dealers.returnobj[0]['Total'][0].TotalBalance;
        this.TotalSent=this.dealers.returnobj[0]['Total'][0].TotalSent;
        this.tableDate=data
      this.tableDate=this.tableDate.returnobj[0]['Orders'];

      }    
    })
  }
  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }

  openIncentive() {
    window.open('https://www.just4u.co.il/SelectGiftNew/?id=qsiWxhyvWeDx1ue0bbIYHQ2')
  }

}
