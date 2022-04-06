import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  mockOrder = {
    title: '#439959',
    cardData: [
        {
          title: 'תאריך הזמנה',
          description: '01/02/2020'
        },
        {
          title: 'סכום',
          description: '₪300'
        },
        {
          title: 'אמצעי תשלום',
          description: '1234 4567 1234 9874'
        }
    ],
  };
  mockCoupons = [
    {
      image:  '/assets/images/mockImg/mock1.png',
      title: 'שגב ארט',
      available: '50 פנויים',
      shiyuch: '200 שיוכים',
      gift: 'שי לפסח',
      cardData: [
        {
          title: 'תאריך תוקף',
          description: '01/02/2020'
        },
        {
          title: 'מחיר שובר בודד',
          description: '₪300'
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
      image: '/assets/images/mockImg/mock2.png',
      title: 'בוטיק & ספא - סופ"ש פרימיום',
      available: '0 פנויים',
      shiyuch: '300 שיוכים',
      gift: null,
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '01/02/2020'
          },
          {
            title: 'מחיר שובר בודד',
            description: '₪300'
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
      image: '/assets/images/mockImg/mock2.png',
      title: 'בוטיק & ספא - סופ"ש פרימיום',
      available: '0 פנויים',
      shiyuch: '300 שיוכים',
      gift: null,
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '01/02/2020'
          },
          {
            title: 'מחיר שובר בודד',
            description: '₪300'
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
      image: '/assets/images/mockImg/mock8.png',
      title: 'רשת קפה לואיז - סניפים',
      available: '0 פנויים',
      shiyuch: '300 שיוכים',
      gift: 'שי ימי הולדת',
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '01/02/2020'
          },
          {
            title: 'מחיר שובר בודד',
            description: '₪300'
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
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}