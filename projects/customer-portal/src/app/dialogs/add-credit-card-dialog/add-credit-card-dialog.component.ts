import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-credit-card-dialog',
  templateUrl: './add-credit-card-dialog.component.html',
  styleUrls: ['./add-credit-card-dialog.component.scss']
})
export class AddCreditCardDialogComponent implements OnInit {
  cardNumber;
  cvvNumber;
  constructor() { }

  ngOnInit(): void {
  }

}
