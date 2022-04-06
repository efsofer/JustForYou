import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit, OnDestroy {
  public currentIndex: number;
  public subscription: Subscription;
  progressView = false;
  mockCoupon = {
      image:  'https://www.just4u.co.il/Pictures/1430fruit_plate1.jpg',
      title: 'ריגושים עד הבית',
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
          title: "מס' הזמנה",
          description: '#439959',
          moreOrder: ['#679545', '#123456']
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
      pieData: {
        number: '80%',
        title: 'משוייכים',
        
        datasets: [{
          data: [150, 250, 100],
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
          '150 לאנשי קשר',
          '250 לפעילות',
          '100 פנויים'
        ]
      }
      // doughnutObj : {
      //   centeredText: '83% משוייכים',
      //   showLegend: false,
      //   datasets: [{
      //     data: [300, 500, 250],
      //     backgroundColor: [
      //       "#118AB2",
      //       "#F7B32B",
      //       "#4DAA57"
      //     ],
      //     hoverBackgroundColor: [
      //       "#118AB2",
      //       "#F7B32B",
      //       "#4DAA57"
      //     ],
      //   }],
      //   labels: [
      //     '25 לאנשי קשר',
      //     '100 לפעילות',
      //     '25 פנויים'
      //   ]
      // }
  };
  steps = [
    {
      title: 'בחירת אנשי קשר',
      isActive: true,
      isDone: false
    },
    {
      title: 'אתר מייל וSMS',
      isActive: false,
      isDone: false
    },
    {
      title: 'סיום',
      isActive: false,
      isDone: false
    }
  ];
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.subscription = this.progressService.getCurrentIndex().subscribe((idx) => {
      this.currentIndex = idx;
    });
  }

  showProgessView(e) {
    console.log(e)
    this.progressView = e;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}




