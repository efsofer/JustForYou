import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-cash-dialog',
  templateUrl: './load-cash-dialog.component.html',
  styleUrls: ['./load-cash-dialog.component.scss']
})
export class LoadCashDialogComponent implements OnInit {
  amount: number;
  creditCards: any;
  selectedCard;
  selectedOption = '1';
  cardNumber: number;
  cvvNumber: number;
  expiredDate: any;
  value: boolean;
  
  constructor() {}

  ngOnInit(): void {
    this.selectedCard = { name: 'כרטיס אשראי חדש', code: '1'};

    this.creditCards = [
      {name: 'כרטיס אשראי חדש', code: '1'},
      {name: '1234 **** **** ****', code: '2'},
      {name: '1573 **** **** ****', code: '3'},
      {name: '2456 **** **** ****', code: '4'}
  ];
  }

  selectCard(e){
    console.log(e);
    this.selectedOption = e.value.code;
  }

}
