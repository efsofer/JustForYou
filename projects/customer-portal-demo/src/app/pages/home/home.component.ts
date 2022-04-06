import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mockCoupons = [
    {
      image: 'https://www.just4u.co.il/Pictures/1430fruit_plate1.jpg',
      title: 'ריגושים עד הבית',
      available: '100 פנויים',
      shiyuch: '400 שיוכים',
      gift: 'שי לשוהים בבידוד'
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1605logo2.jpg',
      title: 'גולדה - קילו גלידה מתנה',
      available: '30 פנויים',
      shiyuch: '120 שיוכים',
      gift: null
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1779%D7%A1%D7%9C-%D7%A4%D7%99%D7%A7%D7%A0%D7%99%D7%A7.jpg',
      title: 'בנדיקט פיקניק',
      available: '20 פנויים',
      shiyuch: '150 שיוכים',
      gift: null
    }
  ];

  mockActivities = [
    {
      image: 'https://www.just4u.co.il/pictures/20986_%D7%AA%D7%A7%D7%A6%D7%99%D7%9180.jpg',
      title: 'מתנות ימי הולדת',
      available: '-',
      shiyuch: '100 שיוכים',
      gift: 'ימי הולדת'
    },
    {
      image: 'https://www.just4u.co.il/pictures/20922_birth_gifts.jpg',
      title: 'מתנה ליולדת',
      available: '-',
      shiyuch: '120 שיוכים',
      gift: null
    },
    {
      image: 'https://www.just4u.co.il/pictures/20905_WEDDING1.jpg',
      title: 'מתנות חתונה',
      available: '20 פנויים',
      shiyuch: '150 שיוכים',
      gift: null
    }
  ];

  mockTrandCoupons = [
    {
      image:  'https://www.just4u.co.il/Pictures/1904MyCollages%20(1).jpg',
      title: 'מאפה נאמן - מארז סופגניות משפחתי',
      priceBefore: 69,
      priceAfter: 45
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1922%D7%9E%D7%A9%D7%97%D7%A7%D7%99%D7%9D%20%D7%9C%D7%97%D7%A0%D7%95%D7%9B%D7%94.jpg',
      title: 'גליתא - מארזי משחק ויצירה לחנוכה',
      priceBefore: 119,
      priceAfter: 89
    },
    {
      image: 'https://www.just4u.co.il/Pictures/19253.jpg',
      title: 'מארזים מעוצבים של שטראוס-עלית',
      priceBefore: 79,
      priceAfter: 64
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1901%D7%A1%D7%A4%D7%99%D7%A0%D7%92.jpg',
      title: 'מאפה נאמן - מיני ספינג\'',
      priceBefore: 39,
      priceAfter: 29
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1860one-love-donuts-collage.jpg',
      title: 'דונאטס ודברים מתוקים',
      priceBefore: 159,
      priceAfter: 129
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1916%D7%9E%D7%A7%D7%95%D7%9D%20%D7%A7%D7%98%D7%9F%20%D7%91%D7%9C%D7%91%20%D7%97%D7%A0%D7%95%D7%9B%D7%941.jpg',
      title: 'מקום קטן בלב - מארז חנוכה',
      priceBefore: 79,
      priceAfter: 56
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1953%D7%97%D7%A0%D7%95%D7%9B%D7%99%D7%94%20%D7%96%D7%94%D7%91.JPG',
      title: 'NOVELL COLLECTION - חנוכיה עד הבית',
      priceBefore: 130,
      priceAfter: 99
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1718%D7%9C%D7%95%D7%92%D7%95%20%D7%AA%D7%9E%D7%95%D7%A0%D7%94%20%D7%9E%D7%A2%D7%95%D7%93%D7%9B%D7%A0%D7%AA.png',
      title: 'מארז טיפוח מבית SABON',
      priceBefore: 179,
      priceAfter: 99
    },
    {
      image: 'https://www.just4u.co.il/Pictures/1629%D7%9C%D7%95%D7%92%D7%95%20%D7%A2%D7%95%D7%92%D7%AA%20%D7%AA%D7%9E%D7%A8%D7%99%D7%9D.jpg',
      title: 'מאפה נאמן - עוגת שמרים אקסטרא',
      priceBefore: 49,
      priceAfter: 35
    },
  ];

  pieData = {
    number: '1500',
    title: 'משוייכים',

    datasets: [{
      data: [300, 500, 250],
      backgroundColor: [
        "#118AB2",
        "#F7B32B",
        "#4DAA57"
      ],
      hoverBackgroundColor: [
        "#118AB2",
        "#F7B32B",
        "#4DAA57"
      ],
    }],
    labels: [
    ]
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }

}
