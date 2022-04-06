import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  showGrid = true;
  mockCoupons = [
    {
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
    }
  ];
  mockActivitis = [
    // {
    //   type: 1,
    //   activitisTypeDetails: {
    //     contactsSetting: {
    //       selectType: 2, // ידני
    //       contactTypes: null
    //     },
    //     sendSettings: {
    //       type: 1, // באופן מיידי
    //       time: 'מייד',
    //       event: null
    //     }
    //   },
    //   image:  '/assets/images/mockImg/mock1.png',
    //   title: 'שי לפסח',
    //   cardData: [
    //     {
    //       title: 'תאריך יצירה',
    //       description: '01/02/2020'
    //     },
    //     {
    //       title: "מס' שיוכים",
    //       description: '200'
    //     },
    //     {
    //       title: "מס' שיוכים פנויים",
    //       description: '50'
    //     },
    //     {
    //       title: "מס' שוברים",
    //       description: '3'
    //     },
    //   ],
    //   pieData: {
    //     number: '80%',
    //     title: 'משוייכים',
        
    //     datasets: [{
    //       data: [300, 500],
    //       backgroundColor: [
    //         "#118AB2",
    //         "#4DAA57"
    //       ],
    //       hoverBackgroundColor: [
    //         "#118AB2",
    //         "#4DAA57"
    //       ],
    //     }],
    //     labels: [
    //       '  שיוכים',
    //       '  פנויים',
    //     ]
    //   }
    // },
    {
      type: 2,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 1, // אוטומטי
          contactTypes: null
        },
        sendSettings: {
          type: 3, // בתאריך מסויים כולל סוג אירוע
          time: '18/08/2020',
          event: 'יום הולדת'
        }
      },
      image:  '/assets/images/mockImg/mock7.png',
      title: 'שי ימי הולדת',
      cardData: [
        {
          title: 'תאריך יצירה',
          description: '01/02/2020'
        },
        {
          title: "מס' שיוכים",
          description: '100'
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
      pieData: {
        number: '80%',
        title: 'משוייכים',
        
        datasets: [{
          data: [300, 500],
          backgroundColor: [
            "#118AB2",
            "#4DAA57"
          ],
          hoverBackgroundColor: [
            "#118AB2",
            "#4DAA57"
          ],
        }],
        labels: [
          '23 שיוכים',
          '150 פנויים',
        ]
      }
    },
    // {
    //   type: 3,
    //   activitisTypeDetails: {
    //     contactsSetting: {
    //       selectType: 2, // ידני
    //       contactTypes: null
    //     },
    //     sendSettings: {
    //       type: 2, // בתאריך מסויים באופן מיידי
    //       time: '18/08/2020',
    //       event: null
    //     }
    //   },
    //   image:  '/assets/images/mockImg/mock7.png',
    //   title: 'שי ימי הולדת',
    //   cardData: [
    //     {
    //       title: 'תאריך יצירה',
    //       description: '01/02/2020'
    //     },
    //     {
    //       title: "מס' שיוכים",
    //       description: '100'
    //     },
    //     {
    //       title: "מס' שיוכים פנויים",
    //       description: '-'
    //     },
    //     {
    //       title: "מס' שוברים",
    //       description: '-'
    //     },
    //   ],
    //   pieData: {
    //     number: '80%',
    //     title: 'משוייכים',
        
    //     datasets: [{
    //       data: [300, 500],
    //       backgroundColor: [
    //         "#118AB2",
    //         "#4DAA57"
    //       ],
    //       hoverBackgroundColor: [
    //         "#118AB2",
    //         "#4DAA57"
    //       ],
    //     }],
    //     labels: [
    //       'שיוכים',
    //       'פנויים',
    //     ]
    //   }
    // },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }

}
