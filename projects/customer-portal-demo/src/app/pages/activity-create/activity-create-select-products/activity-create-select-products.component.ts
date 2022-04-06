import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-create-select-products',
  templateUrl: './activity-create-select-products.component.html',
  styleUrls: ['./activity-create-select-products.component.scss']
})
export class ActivityCreateSelectProductsComponent implements OnInit {
  display = false;
  selectedValue = 'val1';
  amountLimit;
  query;
  options;
  selectedOption;
  fromPrice;
  toPrice;
  mockTrandCoupons = [
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock6.png',
      title: 'עיסוי אישי',
      priceBefore: 150,
      priceAfter: 100
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock7.png',
      title: 'מגש אירוח munier',
      priceBefore: 150,
      priceAfter: 120
    },
    {
      isSelected: false,
      image:  '/assets/images/mockImg/mock8.png',
      title: 'סעודה זוגית',
      priceBefore: 200,
      priceAfter: 150
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock9.png',
      title: 'סעודה זוגית',
      priceBefore: 300,
      priceAfter: 250
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock.jpg',
      title: 'שגב ארט',
      priceBefore: 150,
      priceAfter: 100
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock11.png',
      title: 'שגב ארט',
      priceBefore: 200,
      priceAfter: 150
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock13.png',
      title: 'שגב ארט',
      priceBefore: 150,
      priceAfter: 100
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock13.png',
      title: 'שגב ארט',
      priceBefore: 300,
      priceAfter: 250
    },
    {
      isSelected: false,
      image: '/assets/images/mockImg/mock14.png',
      title: 'שגב ארט',
      priceBefore: 200,
      priceAfter: 150
    },
  ];
  mockCoupons = [
    {
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  select(e) {

  }

  selectTrand(index) {
    this.mockTrandCoupons[index].isSelected = true;
  }

  removeTrand(index) {
    this.mockTrandCoupons[index].isSelected = false;
  }

  selectCoupon(index) {
    this.mockCoupons[index].isSelected = true;
  }

  removeCoupon(index) {
    this.mockCoupons[index].isSelected = false;
  }

}
