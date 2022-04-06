import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.scss']
})
export class OrdersManagementComponent implements OnInit {
  orderNumber;
  code;
  fromPrice;
  toPrice;
  dateFrom;
  dateTo;
  mockOrders = [
    {
      title: '#439959',
      cardData: [
          {
            title: 'תאריך הזמנה',
            description: '01/02/2020'
          },
          {
            title: 'סכום',
            description: '300₪'
          },
          {
            title: 'אמצעי תשלום',
            description: '1234 4567 1234 9874'
          }
      ],
    },
    {
      title: '#431959',
      cardData: [
          {
            title: 'תאריך הזמנה',
            description: '01/02/2020'
          },
          {
            title: 'סכום',
            description: '300₪'
          },
          {
            title: 'אמצעי תשלום',
            description: '1234 4567 1234 9874'
          }
      ],
    },
    {
      title: '#239959',
      cardData: [
          {
            title: 'תאריך הזמנה',
            description: '01/02/2020'
          },
          {
            title: 'סכום',
            description: '300₪'
          },
          {
            title: 'אמצעי תשלום',
            description: '1234 4567 1234 9874'
          }
      ],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
