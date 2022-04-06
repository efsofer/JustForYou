import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';

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
    // image:  './assets/images/mockImg/mock1.png',
    // title: 'שגב ארט',


    // cardData: [
    //   {
    //     title: 'תאריך תוקף',
    //     description: '01/02/2020'
    //   },
    //   {
    //     title: 'מחיר שובר בודד',
    //     description: '300'
    //   },
    //   {
    //     title: 'תאריך הזמנה',
    //     description: '12/01/2020'
    //   },
    //   {
    //     title: "מס' הזמנה",
    //     description: '#439959',
    //     moreOrder: ['#679545', '#123456']
    //   },
    //   {
    //     title: "מס' יחידות",
    //     description: '150'
    //   },
    //   {
    //     title: 'קטגוריה',
    //     description: 'מלונות יוקרה'
    //   },
    // ],
    pieData: {
      number: '83%',
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
        '25 לאנשי קשר',
        '100 לפעילות',
        '25 פנויים'
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
  pieData: any='';
  voucherId: any='';
  itemById: any='';
  sendVoucher: any='';
  custByVouchers: any='';
  allCusts: any='';
  calc: any='';
  percent: any='';
  haveVouchers=true

  constructor(private progressService: ProgressService, private router: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.subscription = this.progressService.getCurrentIndex().subscribe((idx) => {
      this.currentIndex = idx;
    });

    this.voucherId = this.router.snapshot.queryParamMap.get('id')    
    this.http.orderid = this.voucherId
    this.http.getVouchers(this.voucherId).subscribe(data => {
      this.itemById = data      
      this.http.getCustsById("", this.voucherId).subscribe(data => {
        this.custByVouchers = data
        if(this.custByVouchers.returnobj[0].Custs.length<1)
        this.haveVouchers=false
        this.custByVouchers = this.custByVouchers.returnobj[0].Custs.length
        // this.http.getCustsById().subscribe(data => {
          if(this.http.sumCusts !=0)       
        this.allCusts = this.http.sumCusts 
        this.percent = ((100 * this.custByVouchers) / this.allCusts);
        let Available = this.itemById.returnobj[0].Available
        this.sendVoucher = {
          link:this.itemById.returnobj[0].Link,
          ActivitiesSent: this.itemById.returnobj[0].ActivitiesSent,
          Activity: this.itemById.returnobj[0].Activity,
          Available: this.itemById.returnobj[0].Available,
          Image: this.itemById.returnobj[0].Image,
          IsGiftCard: this.itemById.returnobj[0].IsGiftCard,
          ItemId: this.itemById.returnobj[0].ItemId,
          ItemName: this.itemById.returnobj[0].ItemName,
          LastOrderDate: this.itemById.returnobj[0].LastOrderDate,
          LastValidDate: this.itemById.returnobj[0].LastValidDate,
          LoadSum: this.itemById.returnobj[0].LoadSum,
          Price: this.itemById.returnobj[0].Price,
          RegularSent: this.itemById.returnobj[0].RegularSent,
          SendReasons: this.itemById.returnobj[0].SendReasons,
          Sent: this.itemById.returnobj[0].Sent,
          Total: this.itemById.returnobj[0].Total,
          inOrders: this.itemById.returnobj[0].inOrders,

          pieData: this.pieData = {
            number: this.percent / 100,
            title: 'משוייכים',

            datasets: [{
              data: [this.allCusts, this.custByVouchers, 100],
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
              this.allCusts + ' לאנשי קשר',
              this.custByVouchers + ' לפעילות',
              `${Available} פנויים`
            ]
          }
        }
        
        this.itemById.returnobj[0] = this.sendVoucher        
        // })

      })


    })
  }

  showProgessView(e) {
   console.log("e:", e)
    this.progressView = e;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}




