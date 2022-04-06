import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // mockCoupons = [
  //   {
  //     image:  './assets/images/mockImg/mock1.png',
  //     title: 'שגב ארט',
  //     available: '50 פנויים',
  //     shiyuch: '200 שיוכים',
  //     gift: 'שי לפסח'
  //   },
  //   {
  //     image: './assets/images/mockImg/mock2.png',
  //     title: 'בוטיק & ספא - סופ"ש פרימיום',
  //     available: '0 פנויים',
  //     shiyuch: '300 שיוכים',
  //     gift: null
  //   },
  //   {
  //     image: './assets/images/mockImg/mock8.png',
  //     title: 'רשת קפה לואיז - סניפים',
  //     available: '0 פנויים',
  //     shiyuch: '300 שיוכים',
  //     gift: 'שי ימי הולדת'
  //   }
  // ];

  // mockTrandCoupons = [
  //   {
  //     image: './assets/images/mockImg/mock6.png',
  //     title: 'רשת קפה לואיז - סניפים',
  //     priceBefore: 150,
  //     priceAfter: 100
  //   },
  //   {
  //     image: './assets/images/mockImg/mock7.png',
  //     title: 'מלון כרמים',
  //     priceBefore: 300,
  //     priceAfter: 250
  //   },
  //   {
  //     image:  './assets/images/mockImg/mock8.png',
  //     title: 'סעודה זוגית',
  //     priceBefore: 200,
  //     priceAfter: 150
  //   },
  //   {
  //     image: './assets/images/mockImg/mock9.png',
  //     title: 'סעודה זוגית',
  //     priceBefore: 300,
  //     priceAfter: 250
  //   },
  //   {
  //     image: './assets/images/mockImg/mock10.png',
  //     title: 'שגב ארט',
  //     priceBefore: 150,
  //     priceAfter: 100
  //   },
  //   {
  //     image: './assets/images/mockImg/mock11.png',
  //     title: 'שגב ארט',
  //     priceBefore: 200,
  //     priceAfter: 150
  //   },
  //   {
  //     image: './assets/images/mockImg/mock13.png',
  //     title: 'שגב ארט',
  //     priceBefore: 150,
  //     priceAfter: 100
  //   },
  //   {
  //     image: './assets/images/mockImg/mock13.png',
  //     title: 'שגב ארט',
  //     priceBefore: 300,
  //     priceAfter: 250
  //   },
  //   {
  //     image: './assets/images/mockImg/mock14.png',
  //     title: 'שגב ארט',
  //     priceBefore: 200,
  //     priceAfter: 150
  //   },
  // ];
  mockTrandCoupons = [
    {
      link: 'https://www.just4u.co.il/coupon/1904',
      image: 'https://www.just4u.co.il/Pictures/1904MyCollages%20(1).jpg',
      title: 'מאפה נאמן - מארז סופגניות משפחתי',
      priceBefore: 69,
      priceAfter: 45
    },
    {
      link: 'https://www.just4u.co.il/coupon/1922',
      image: 'https://www.just4u.co.il/Pictures/1922%D7%9E%D7%A9%D7%97%D7%A7%D7%99%D7%9D%20%D7%9C%D7%97%D7%A0%D7%95%D7%9B%D7%94.jpg',
      title: 'גליתא - מארזי משחק ויצירה לחנוכה',
      priceBefore: 119,
      priceAfter: 89
    },
    {
      link: 'https://www.just4u.co.il/coupon/1925',
      image: 'https://www.just4u.co.il/Pictures/19253.jpg',
      title: 'מארזים מעוצבים של שטראוס-עלית',
      priceBefore: 79,
      priceAfter: 64
    },
    {
      link: 'https://www.just4u.co.il/coupon/1901',
      image: 'https://www.just4u.co.il/Pictures/1901%D7%A1%D7%A4%D7%99%D7%A0%D7%92.jpg',
      title: 'מאפה נאמן - מיני ספינג\'',
      priceBefore: 39,
      priceAfter: 29
    },
    {
      link: 'https://www.just4u.co.il/coupon/1860',
      image: 'https://www.just4u.co.il/Pictures/1860one-love-donuts-collage.jpg',
      title: 'דונאטס ודברים מתוקים',
      priceBefore: 159,
      priceAfter: 129
    },
    {
      link: 'https://www.just4u.co.il/coupon/1916',
      image: 'https://www.just4u.co.il/Pictures/1916%D7%9E%D7%A7%D7%95%D7%9D%20%D7%A7%D7%98%D7%9F%20%D7%91%D7%9C%D7%91%20%D7%97%D7%A0%D7%95%D7%9B%D7%941.jpg',
      title: 'מקום קטן בלב - מארז חנוכה',
      priceBefore: 79,
      priceAfter: 56
    },
    {
      link: 'https://www.just4u.co.il/coupon/1953',
      image: 'https://www.just4u.co.il/Pictures/1953%D7%97%D7%A0%D7%95%D7%9B%D7%99%D7%94%20%D7%96%D7%94%D7%91.JPG',
      title: 'NOVELL COLLECTION - חנוכיה עד הבית',
      priceBefore: 130,
      priceAfter: 99
    },
    {
      link: 'https://www.just4u.co.il/coupon/1718',
      image: 'https://www.just4u.co.il/Pictures/1718%D7%9C%D7%95%D7%92%D7%95%20%D7%AA%D7%9E%D7%95%D7%A0%D7%94%20%D7%9E%D7%A2%D7%95%D7%93%D7%9B%D7%A0%D7%AA.png',
      title: 'מארז טיפוח מבית SABON',
      priceBefore: 179,
      priceAfter: 99
    },
    {
      link: 'https://www.just4u.co.il/coupon/1629',
      image: 'https://www.just4u.co.il/Pictures/1629%D7%9C%D7%95%D7%92%D7%95%20%D7%A2%D7%95%D7%92%D7%AA%20%D7%AA%D7%9E%D7%A8%D7%99%D7%9D.jpg',
      title: 'מאפה נאמן - עוגת שמרים אקסטרא',
      priceBefore: 49,
      priceAfter: 35
    },
  ];
  vouchers: any;
  activities: any;
  custs: any;
  FName = localStorage.getItem('FName')


  pieData: any
  isLoading = true
  isVouchersLoading = true
  isActivitiesLoading = true
  size: any;
  myActive: any;
  notActive: any;
  getDealerInInfo: any;
  sumVouchers: any;
  sumActivities: any;

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.size = this.http.sumCusts
    this.sumVouchers = this.http.sumVouchers
    this.sumActivities = this.http.sumActivities
    this.getdealerInInfo()
    this.getVouchers()
    this.getActivities()

  }

  createActivity() {
    // this.router.navigate(['activities-management/create-activity']);
    //contact
    window.open('https://www.just4u.co.il/contact')

  }

  getVouchers() {
    // this.http.getVouchers().subscribe(data => {
    //   this.vouchers = data
    //   this.isVouchersLoading = false
    //   if (!this.isVouchersLoading && !this.isActivitiesLoading) {
    //     this.isLoading = false
    //   }
    // })
    this.vouchers = this.http.vouchers
    this.isVouchersLoading = false
    if (!this.isVouchersLoading && !this.isActivitiesLoading)
      this.isLoading = false
  }

  getActivities() {
    // this.http.getActivities(`${new Date().getFullYear() - 1}-01-01`).subscribe(data => {
    //   this.activities = data
    //   this.isActivitiesLoading = false
    //   if (!this.isVouchersLoading && !this.isActivitiesLoading) {
    //     this.isLoading = false
    //   }
    // })
    this.activities = this.http.activities
    this.isActivitiesLoading = false
    if (!this.isVouchersLoading && !this.isActivitiesLoading) {
      this.isLoading = false
    }
  }

  getdealerInInfo() {
    // this.http.getCusts().subscribe(data => {
    //   this.custs = data
    //   this.size = this.custs.returnobj[0];
    //   this.size = this.custs.returnobj[0]['Total']

    // })

    // this.http.getCustsById().subscribe(data => {
    //   this.size = data
    //   this.size = this.size['returnobj'][0].Custs.length;
    this.http.getDealerInInfo().subscribe(data => {
      this.getDealerInInfo = data
      this.myActive = this.getDealerInInfo.returnobj[0].Stats.TotalGiftsSent;
      this.notActive = this.getDealerInInfo.returnobj[0].Stats.AvailableVouchers;

      this.loadpiedata(this.size, this.myActive, this.notActive)
    })
    // })

  }
  contact() {
    window.open('https://www.just4u.co.il/contact')
  }
  contactAll() {
    window.open('https://www.just4u.co.il')
  }
  loadpiedata(size?: any, active?: any, notActive?: any) {
    this.pieData = {
      number: size,
      title: 'משוייכים',

      datasets: [{
        data: [active, size, notActive],
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
  }
}
