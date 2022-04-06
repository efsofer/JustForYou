import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/interfaces';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity;
  showGrid = true;
  activityId: any;
  pieData: any;
  availableCustomersCount: any;
  //    number: 0,
  //    title: 'עובדים',
  //    datasets: [{
  //      data: [],
  //      backgroundColor: [
  //        "#118AB2",
  //        "#4DAA57",
  //        "#FFCE56"
  //      ],
  //      hoverBackgroundColor: [
  //        "#118AB2",
  //        "#4DAA57",
  //        "#FFCE56"
  //      ],
  //    }],
  //    labels: ['נשלחו', 'בחרו', 'לשליחה עתידית']
  //  };
  //  = {
  //   number: 0,
  //   title: 'עובדים',
  //   datasets: [{
  //     data: [],
  //     backgroundColor: [
  //       "#118AB2",
  //       "#4DAA57",
  //       "#FFCE56"
  //     ],
  //     hoverBackgroundColor: [
  //       "#118AB2",
  //       "#4DAA57",
  //       "#FFCE56"
  //     ],
  //   }],
  //   labels: ['נשלחו', 'בחרו', 'לשליחה עתידית']
  // };
  chartData = {
    labels: [],
    datasets: [
      {
        label: 'מתנות שנבחרו',
        backgroundColor: '#42A5F5', //EC407A
        data: []
      },
    ]
  };
  chartOptions = {
    legend: {
      labels: {
        fontColor: '#495057',
        fontFamily: 'Assistant'
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#495057',
          fontFamily: 'Assistant'
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: '#495057',
          fontFamily: 'Assistant'
        }
      }]
    }
  }
  activityById: any = '';
  custsById: any = '';
  sumPuple: any = '';
  allCusts: any = '';
  percent: any = '';
  sendActivity: any = '';
  customers: any = '';
  testACtivity: any = '';
  /*mockActivitis = [
    {
      type: 2,
      creationdate: '2021-01-06T18:36:39',
      budgetperemployee: 85,
      TotalUsedBudget: 0,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 1, // אוטומטי
          contactTypes: null
        },
        sendSettings: {
          type: 3, // בתאריך מסויים כולל סוג אירוע
          time: '31/12/2021',
          event: 'יום הולדת'
        }
      },
      image: 'https://www.just4u.co.il/GreettingPics/22567_bday_cake.jpg',
      title: 'מתנות ימי הולדת',
      cardData: [
        {
          title: 'תאריך יצירה',
          description: '06/01/2021'
        },
        {
          title: "מס' שיוכים",
          description: '507'
        },
        {
          title: "מס' שיוכים פנויים",
          description: '-'
        },
        {
          title: "מס' שוברים",
          description: '-'
        },
      ],
    }
  ];*/
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.queryParamMap.get('id')
    this.activityId = this.activityId.split(',', 1).toString();

    this.getCustsById()
    this.getActivityById()
    this.activity = <Activity>this.route.snapshot.data.actData;
    //this.mockActivitis[0].TotalUsedBudget = this.activity.recipients * this.mockActivitis[0].budgetperemployee;
    // this.pieData.number = this.activity.recipients;

    let sent = this.activity.received - this.activity.chose, future = this.activity.recipients - this.activity.received, items = [];
    for (let cust of this.activity?.Custs) {
      // for gifts - traverse list of chosen items
      if (cust.ItemId) {
        let ind = items.indexOf(cust.ItemId);
        if (ind !== -1) ++this.chartData.datasets[0].data[ind];
        else {
          items.push(cust.ItemId);
          this.chartData.labels.push(cust.itemName);
          this.chartData.datasets[0].data.push(1);
        }
      }
    }
    //  this.pieData.datasets. = [sent, this.activity.chose, future];
    // this.activity.pieData = this.pieData;
    this.activity.chartData = this.chartData;
    this.activity.chartOptions = this.chartOptions;
  }

  // createActivity() {
  //   this.router.navigate(['activities-management/create-activity']);
  // }
  test() {
    window.open('https://test.justforu.co.il//SelectGiftNew?id=IzQy8g6wrsVerURvtMzP3A2')
  }

  getCustsById() {
    this.http.getCustsByIdActivity(this.activityId).subscribe(data => {
      this.custsById = data
    })
  }

  getActivityById() {
    this.http.getActivityById(this.activityId).subscribe(data => {


      this.availableCustomersCount = data['returnobj'][0]['notchoose'] - data['returnobj'][0]['freeItems'];

      this.activityById = data
      this.http.getCustsByIdActivity(this.activityId).subscribe(data => {
        this.customers = data
        this.sumPuple = this.customers.returnobj[0].Custs.length
        this.http.getCustsById().subscribe(data => {
          this.allCusts = data
          this.allCusts = this.allCusts.returnobj[0].Custs.length
          this.percent = ((100 * this.sumPuple) / this.allCusts);
          let Available = this.activityById.returnobj[0].Recipients - this.activityById.returnobj[0].REceived
          this.sendActivity = {
            ActivityId: this.activityById.returnobj[0].ActivityId,
            Name: this.activityById.returnobj[0].Name,
            image: this.activityById.returnobj[0].image,
            Active: this.activityById.returnobj[0].Active,
            DateToInvite: this.activityById.returnobj[0].DateToInvite,
            endDate: this.activityById.returnobj[0].endDate,
            ClientId: this.activityById.returnobj[0].ClientId,
            creationdate: this.activityById.returnobj[0].creationdate,
            budgetperemployee: this.activityById.returnobj[0].budgetperemployee,
            choose: this.activityById.returnobj[0].choose,
            ActivityComponents: this.activityById.returnobj[0].ActivityComponents,
            type: this.activityById.returnobj[0].type,
            typedescription: this.activityById.returnobj[0].typedescription,
            Recipients: this.activityById.returnobj[0].Recipients,
            REceived: this.activityById.returnobj[0].REceived,
            totalAllocatedBudget: this.activityById.returnobj[0].totalAllocatedBudget,
            TotalUsedBudget: this.activityById.returnobj[0].TotalUsedBudget,
            sendreason: this.activityById.returnobj[0].sendreason,
            link: this.activityById.returnobj[0].link,
            pieData: this.pieData = {
              number: this.percent / 100,
              title: 'משוייכים',

              datasets: [{
                data: [this.allCusts, this.sumPuple, 100],
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
                this.sumPuple + ' לפעילות',
                `${Available} פנויים`
              ]
            }
          }
          this.activityById.returnobj[0] = this.sendActivity
        })
      })
    })
  }
}
