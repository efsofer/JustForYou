import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() type;
  @Input() data;
  @Input() availableCustomersCount;
  test: any = "test"
  title: 'תקציב לעובד'
  // cardData: [
  //   {
  //     title: 'תקציב לעובד',
  //     description: '65 ₪'
  //   },
  //   {
  //     title: 'סך הכל לפעילות',
  //     description: '75,855 ₪'
  //   },
  //   {
  //     title: 'תאריך יצירה',
  //     description: '01/01/2021'
  //   },
  //   {
  //     title: "כמות עובדים",
  //     description: '1,167'
  //   }
  // ]

  // cardData2: [
  //   {
  //     title: 'תקציב לעובד',
  //     // description: '65 ₪'
  //   },
  //   {
  //     title: 'סך הכל לפעילות',
  //     // description: '75,855 ₪'
  //   },
  //   {
  //     title: 'תאריך יצירה',
  //     // description: '01/01/2021'
  //   },
  //   {
  //     title: "כמות עובדים",
  //     // description: '1,167'
  //   }
  // ]

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    let t = this.data;
    let c = this.availableCustomersCount;
    debugger
  }



  getCouponId(id) {
    this.http.orderid = id
  }
  link(link?: any) {
    console.log('data', this.data.link);

    window.open(this.data.link)
  }
}
