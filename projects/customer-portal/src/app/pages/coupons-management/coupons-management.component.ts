import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
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
  vouchers: any;
  haveVouchers = false
  // mockCoupons = [
  //   {
  //     image:  './assets/images/mockImg/mock1.png',
  //     title: 'שגב ארט',
  //     available: '50 פנויים',
  //     shiyuch: '200 שיוכים',
  //     gift: 'שי לפסח',
  //     cardData: [
  //       {
  //         title: 'תאריך תוקף',
  //         description: '01/02/2020'
  //       },
  //       {
  //         title: 'מחיר שובר בודד',
  //         description: '300'
  //       },
  //       {
  //         title: 'תאריך הזמנה',
  //         description: '12/01/2020'
  //       },
  //       {
  //         title: "מס' יחידות",
  //         description: '150'
  //       },
  //       {
  //         title: 'קטגוריה',
  //         description: 'מלונות יוקרה'
  //       },
  //     ],
  //   },
  //   {
  //     image: './assets/images/mockImg/mock2.png',
  //     title: 'בוטיק & ספא - סופ"ש פרימיום',
  //     available: '0 פנויים',
  //     shiyuch: '300 שיוכים',
  //     gift: null,
  //     cardData: [
  //         {
  //           title: 'תאריך תוקף',
  //           description: '01/02/2020'
  //         },
  //         {
  //           title: 'מחיר שובר בודד',
  //           description: '300'
  //         },
  //         {
  //           title: 'תאריך הזמנה',
  //           description: '12/01/2020'
  //         },
  //         {
  //           title: "מס' יחידות",
  //           description: '150'
  //         },
  //         {
  //           title: 'קטגוריה',
  //           description: 'מלונות יוקרה'
  //         },
  //     ],
  //   },
  //   {
  //     image: './assets/images/mockImg/mock2.png',
  //     title: 'בוטיק & ספא - סופ"ש פרימיום',
  //     available: '0 פנויים',
  //     shiyuch: '300 שיוכים',
  //     gift: null,
  //     cardData: [
  //         {
  //           title: 'תאריך תוקף',
  //           description: '01/02/2020'
  //         },
  //         {
  //           title: 'מחיר שובר בודד',
  //           description: '300'
  //         },
  //         {
  //           title: 'תאריך הזמנה',
  //           description: '12/01/2020'
  //         },
  //         {
  //           title: "מס' יחידות",
  //           description: '150'
  //         },
  //         {
  //           title: 'קטגוריה',
  //           description: 'מלונות יוקרה'
  //         },
  //     ],
  //   },
  //   {
  //     image: './assets/images/mockImg/mock8.png',
  //     title: 'רשת קפה לואיז - סניפים',
  //     available: '0 פנויים',
  //     shiyuch: '300 שיוכים',
  //     gift: 'שי ימי הולדת',
  //     cardData: [
  //         {
  //           title: 'תאריך תוקף',
  //           description: '01/02/2020'
  //         },
  //         {
  //           title: 'מחיר שובר בודד',
  //           description: '300'
  //         },
  //         {
  //           title: 'תאריך הזמנה',
  //           description: '12/01/2020'
  //         },
  //         {
  //           title: "מס' יחידות",
  //           description: '150'
  //         },
  //         {
  //           title: 'קטגוריה',
  //           description: 'מלונות יוקרה'
  //         },
  //     ],
  //   }
  // ];
  isLoading = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getVouchers()
  }

  getVouchers() {
    this.isLoading = true
    this.http.getVouchers().subscribe(data => {
      this.vouchers = data
      if (this.vouchers.returnobj.length > 0)
        this.haveVouchers = true
      this.isLoading = false
    })
    this.isLoading = false
  }
  search() {
    this.isLoading = true
    this.haveVouchers = false
    this.http.getVouchers(this.couponCode, "", this.fromDate, this.toDate, this.fromPrice, this.toPrice, this.query, this.value).subscribe(data => {
      this.vouchers = data
      if (this.vouchers.returnobj.length > 0)
        this.haveVouchers = true
      this.couponCode = this.fromPrice = this.toPrice = 0
      this.fromDate = this.toDate = this.query = this.value = ""
      this.isLoading = false
    })
  }
}
