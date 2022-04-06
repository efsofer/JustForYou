import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons-management',
  templateUrl: './coupons-management.component.html',
  styleUrls: ['./coupons-management.component.scss']
})
export class CouponsManagementComponent implements OnInit {
  query: string;
  couponCode: number;
  orderNumber: number;
  assigns;
  selectedAssign;
  fromPrice: number;
  toPrice: number;
  value: any;
  categories: any;
  selectedCategory;
  selectedCard: any;
  orderDateFrom;
  orderDateTo;
  fromDate;
  toDate;
  mockCoupons = [
    {
      image:  'https://www.just4u.co.il/Pictures/1430fruit_plate1.jpg',
      title: 'ריגושים עד הבית',
      available: '100 פנויים',
      shiyuch: '400 שיוכים',
      gift: 'מתנות לשוהים בבידוד/חל"ת',
      cardData: [
        {
          title: 'תאריך תוקף',
          description: '31/12/2021'
        },
        {
          title: 'מחיר שובר בודד',
          description: '129'
        },
        {
          title: 'תאריך הזמנה',
          description: '18/10/2020'
        },
        {
          title: "מס' יחידות",
          description: '500'
        },
        {
          title: 'קטגוריה',
          description: 'עד הבית'
        },
      ],
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1605logo2.jpg',
      title: 'גולדה - קילו גלידה מתנה',
      available: '30 פנויים',
      shiyuch: '120 שיוכים',
      gift: null,
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '31/08/2021'
          },
          {
            title: 'מחיר שובר בודד',
            description: '89'
          },
          {
            title: 'תאריך הזמנה',
            description: '03/11/2020'
          },
          {
            title: "מס' יחידות",
            description: '150'
          },
          {
            title: 'קטגוריה',
            description: 'עד הבית'
          },
      ],
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1779%D7%A1%D7%9C-%D7%A4%D7%99%D7%A7%D7%A0%D7%99%D7%A7.jpg',
      title: 'בנדיקט פיקניק',
      available: '20 פנויים',
      shiyuch: '150 שיוכים',
      gift: null,
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '12/10/2021'
          },
          {
            title: 'מחיר שובר בודד',
            description: '250'
          },
          {
            title: 'תאריך הזמנה',
            description: '12/10/2020'
          },
          {
            title: "מס' יחידות",
            description: '170'
          },
          {
            title: 'קטגוריה',
            description: 'עד הבית'
          },
      ],
    },
    {
      image: '/assets/images/rebarathome.jpg',
      title: 'rebar - מארז להכנה ביתית',
      available: '84 פנויים',
      shiyuch: '116 שיוכים',
      gift: 'שי ימי הולדת',
      cardData: [
          {
            title: 'תאריך תוקף',
            description: '31/12/2021'
          },
          {
            title: 'מחיר שובר בודד',
            description: '129'
          },
          {
            title: 'תאריך הזמנה',
            description: '02/09/2021'
          },
          {
            title: "מס' יחידות",
            description: '200'
          },
          {
            title: 'קטגוריה',
            description: 'עד הבית'
          },
      ],
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
