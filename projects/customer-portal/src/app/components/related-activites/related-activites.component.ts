import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-related-activites',
  templateUrl: './related-activites.component.html',
  styleUrls: ['./related-activites.component.scss']
})
export class RelatedActivitesComponent implements OnInit {
  mockCoupons = [
    {
      image:  './assets/images/mockImg/mock3.png',
      title: 'שי לפסח',
      contacts: 'אנשי הקשר נבחרים באופן ידני',
      send: 'כל השוברים יישלחו מיד אחרי השיוך',
      cardData: [
        {
          title: 'תאריך תוקף',
          description: '01/02/2020'
        },
        {
          title: 'מחיר שובר בודד',
          description: '300'
        },
        {
          title: 'תאריך הזמנה',
          description: '12/01/2020'
        },
        {
          title: "מס' יחידות",
          description: '150'
        },
        {
          title: 'קטגוריה',
          description: 'מלונות יוקרה'
        },
      ],
    },
    {
      image:  './assets/images/mockImg/mock4.png',
      title: 'שי לראש השנה',
      contacts: 'אנשי הקשר נבחרים באופן ידני',
      send: 'כל השוברים יישלחו מיד אחרי השיוך',
      cardData: [
        {
          title: 'תאריך תוקף',
          description: '01/02/2020'
        },
        {
          title: 'מחיר שובר בודד',
          description: '300'
        },
        {
          title: 'תאריך הזמנה',
          description: '12/01/2020'
        },
        {
          title: "מס' יחידות",
          description: '150'
        },
        {
          title: 'קטגוריה',
          description: 'מלונות יוקרה'
        },
      ],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
