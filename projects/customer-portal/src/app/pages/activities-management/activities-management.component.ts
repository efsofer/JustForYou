import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss']
})
export class ActivitiesManagementComponent implements OnInit {
  query;
  amount;
  fromPrice;
  toPrice;
  createDateFrom;
  createDateTo;
  expDateFrom;
  expDateTo;
  haveActivities = false
  activies: any = []
  // mockActivitis = [
  //   {
  //     orderId: 22956,
  //     image: 'https://www.just4u.co.il/GreettingPics/22567_bday_cake.jpg',
  //     title: 'מתנות ימי הולדת',
  //     sendTime: 'יישלחו',
  //     sendText: 'ביום ההולדת של העובדים',
  //     cardData: [
  //       {
  //         title: 'תקציב משוער',
  //         description: '102,000 ₪'
  //       },
  //       {
  //         title: 'נוצל מהתקציב',
  //         description: '43,095 ₪'
  //       },
  //       {
  //         title: 'תאריך יצירה',
  //         description: '06/01/2021'
  //       },
  //       {
  //         title: "מס' שיוכים",
  //         description: '507'
  //       }
  //     ],
  //   }
  // ];
  constructor(private router: Router, private http: HttpService) { }
  isLoading = false
  ngOnInit(): void {
    this.isLoading = true
    // if (this.haveActivities)
    //   this.activies = this.http.activities
    // this.isLoading = false
    this.http.getActivities(`${new Date().getFullYear() - 1}-01-01`).subscribe(data => {
      this.activies = data      
      if (this.activies.returnobj.length > 0)
        this.haveActivities = true
      this.isLoading = false

    })

    // if (this.http.dealerId == 24741) {
    //   this.mockActivitis = [
    //     {
    //       orderId: 22871,
    //       image: 'https://www.just4u.co.il/Pictures/21495_20201217%20birthdaysite_v2_sm.jpg',
    //       title: 'מתנות ימי הולדת',
    //       sendTime: 'יישלחו',
    //       sendText: 'ביום ההולדת של העובדים',
    //       cardData: [
    //         {
    //           title: 'תקציב לעובד',
    //           description: '65 ₪'
    //         },
    //         {
    //           title: 'סך הכל לפעילות',
    //           description: '75,855 ₪'
    //         },
    //         {
    //           title: 'תאריך יצירה',
    //           description: '01/01/2021'
    //         },
    //         {
    //           title: "כמות עובדים",
    //           description: '1,167'
    //         }
    //       ],
    //     },
    //     {
    //       orderId: 23005,
    //       image: 'https://www.just4u.co.il/Pictures/22047_950.jpg',
    //       title: 'מתנות הוקרה',
    //       sendTime: 'יישלחו',
    //       sendText: 'באופן מיידי',
    //       cardData: [
    //         {
    //           title: 'תקציב לעובד',
    //           description: '600 ₪'
    //         },
    //         {
    //           title: 'נוצל מהתקציב',
    //           description: '5,400 ₪'
    //         },
    //         {
    //           title: 'תאריך יצירה',
    //           description: '11/01/2021'
    //         },
    //         {
    //           title: "כמות עובדים",
    //           description: '9'
    //         }
    //       ],
    //     },
    //     {
    //       orderId: 24568,
    //       image: 'https://www.just4u.co.il/Pictures/24475_%D7%A7%D7%A7%D7%A7%D7%A7%D7%A7.jpg',
    //       title: 'מתנות יום המשפחה',
    //       sendTime: 'נשלחו',
    //       sendText: 'ב-24/02/2021',
    //       cardData: [
    //         {
    //           title: 'תקציב לעובד',
    //           description: '100 ₪'
    //         },
    //         {
    //           title: 'נוצל מהתקציב',
    //           description: '1,100 ₪'
    //         },
    //         {
    //           title: 'תאריך יצירה',
    //           description: '24/02/2021'
    //         },
    //         {
    //           title: "כמות עובדים",
    //           description: '11'
    //         }
    //       ],
    //     },
    //     {
    //       orderId: 22546,
    //       image: 'https://www.just4u.co.il/Pictures/22378_bggift.jpg',
    //       title: 'אתר מתנות לזכייה בחידון',
    //       sendTime: 'נשלחו',
    //       sendText: 'ב-22/12/2020',
    //       cardData: [
    //         {
    //           title: 'תקציב לעובד',
    //           description: '100 ₪'
    //         },
    //         {
    //           title: 'נוצל מהתקציב',
    //           description: '900 ₪'
    //         },
    //         {
    //           title: 'תאריך יצירה',
    //           description: '22/12/2021'
    //         },
    //         {
    //           title: "כמות עובדים",
    //           description: '9'
    //         }
    //       ],
    //     },
    //   ]
    // }
  }

  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }
  search() {
    this.haveActivities=false
    this.isLoading = true
    this.http.getActivities(this.createDateFrom, this.createDateTo,this.fromPrice, this.toPrice, this.query )
      .subscribe(data => {
        this.activies = data
        if (this.activies.returnobj.length >0)
          this.haveActivities = true
        this.query = this.fromPrice = this.toPrice = this.createDateFrom = this.createDateTo = this.expDateTo = ""
        this.isLoading = false
      })
  }

}
