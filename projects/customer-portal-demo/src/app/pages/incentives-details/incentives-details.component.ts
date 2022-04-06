import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incentives-details',
  templateUrl: './incentives-details.component.html',
  styleUrls: ['./incentives-details.component.scss']
})
export class IncentivesDetailsComponent implements OnInit {
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
        number: '36%',
        title: 'ניצול תקציב',
        
        datasets: [{
          data: [2764, 4936],
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
          '2764 ₪ נוצלו',
          '4936 ₪ יתרה',
        ]
      }
    },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }
}
