import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent implements OnInit {
  display = false;
  cols: any;
  tableDate = [
    {
      amount: '1000-',
      date: '12/01/2020',
      transaction: {
          text: null,
          linkText: ' #985668'
      },
      payment: 'יתרת הזכות לרשותי'
    },
    {
      amount: '1000-',
      date: '22/02/2020',
      transaction: {
          text: null,
          linkText: '#575733'
      },
      payment: 'יתרת הזכות לרשותי'
    },
    {
      amount: '300-',
      date: '17/01/2020',
      transaction: {
          text: 'שובר נבחר על ידי איש קשר',
          linkText: 'דניאל לבי - ת.ז 345789459'
      },
      payment: 'יתרת הזכות לרשותי'
    },
    {
      amount: '1000-',
      date: '30/07/2019',
      transaction: {
          text: 'שובר נבחר על ידי איש קשר',
          linkText: 'משה כהן - ת.ז 789589452'
      },
      payment: 'יתרת הזכות לרשותי'
    },
    {
      amount: '10300-',
      date: '31/10/2018',
      transaction: {
          text: 'טעינה',
          linkText: null
      },
      payment: '(2564) כרטיס אשראי'
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'amount', header: 'סכום' },
      { field: 'date', header: 'תאריך' },
      { field: 'transaction', header: 'תנועה' },
      { field: 'payment', header: 'אמצעי תשלום' },
      { field: 'download', header: '' },
    ];
  }


  goTo(type) {
    if (type === 'order') {
      this.router.navigate(['/orders-management/1']);
    }
  }

}
