import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
          time: '31/12/2020',
          event: 'יום הולדת'
        }
      },
      link: 'https://www.just4u.co.il/SelectGiftNew/?id=D9aXeZVML2bwJYacgZZXYw2',
      image:  'https://www.just4u.co.il/pictures/20986_%D7%AA%D7%A7%D7%A6%D7%99%D7%9180.jpg',
      title: 'מתנות ימי הולדת',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '150,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '94,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/01/2020'
        },
        {
          title: "מס' שיוכים",
          description: '100'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 1, // באופן מיידי
          time: 'מייד',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectGiftNew/?id=K1DIeLWsrP2l72ZPR_JY0g2',
      image:  'https://www.just4u.co.il/pictures/20922_birth_gifts.jpg',
      title: 'מתנה ליולדת',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '30,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '12,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '24/03/2020'
        },
        {
          title: "מס' שיוכים",
          description: '120'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 1, // באופן מיידי
          time: 'מייד',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectGiftNew/?id=2eJQRNsCz-IUNBOk21suTQ2',
      image:  'https://www.just4u.co.il/pictures/20905_WEDDING1.jpg',
      title: 'מתנות חתונה',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '50,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '37,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/02/2020'
        },
        {
          title: "מס' שיוכים",
          description: '37'
        }
      ],
    },
    {
      type: 3,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 2, // בתאריך מסויים באופן מיידי
          time: '24/03/2021',
          event: null
        }
      },
      link: 'https://www.just4u.co.il//SelectGiftNew?id=lg6_wAjMXySEslUBu8YSEA2',
      image:  'https://www.just4u.co.il/Pictures/passover-gifts.jpg',
      title: 'שי לפסח',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '200,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '0 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/12/2020'
        },
        {
          title: "מס' שיוכים",
          description: '200'
        }
      ],
    },
    {
      type: 3,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 2, // בתאריך מסויים באופן מיידי
          time: '01/01/2021',
          event: null
        }
      },
      link: 'https://www.just4u.co.il//SelectGiftNew?id=lg6_wAjMXySEslUBu8YSEA2',
      image:  'https://www.just4u.co.il/assets/images/gifts/%D7%AA%D7%9E%D7%A8%D7%99%D7%A6%D7%99%D7%9D.jpg',
      title: 'מתנות מצטיינים',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '10,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '10,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/11/2020'
        },
        {
          title: "מס' שיוכים",
          description: '25'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 1, // באופן מיידי
          time: 'מייד',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectGiftNew/?id=t-Lz6UgFo3K1TiYkV7jDpg2',
      image:  'https://www.just4u.co.il/pictures/20906_%D7%91%D7%A8%20%D7%9E%D7%A6%D7%95%D7%95%D7%94.jpg',
      title: 'מתנות בר/בת מצווה',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '20,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '18,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/02/2020'
        },
        {
          title: "מס' שיוכים",
          description: '120'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 1, // באופן מיידי
          time: 'מייד',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectGiftNew/?id=yHm5dJxzzGexFSZ3APrNQw2',
      image:  'https://www.just4u.co.il/pictures/20928_recruitment_partyNEW.jpg',
      title: 'שי למתגייס/ת',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '15,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '12,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/05/2020'
        },
        {
          title: "מס' שיוכים",
          description: '64'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 2,
          time: '01/10/2020',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectActivity?id=24aUNpnPlceKBJ5p7CO4bA2',
      image:  'https://www.just4u.co.il/Pictures/16023_background-gift-small.jpg',
      title: 'גיבושים מותאמי תו סגול',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '500,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '289,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/06/2020'
        },
        {
          title: "מס' שיוכים",
          description: '21'
        }
      ],
    },
    {
      type: 1,
      activitisTypeDetails: {
        contactsSetting: {
          selectType: 2, // ידני
          contactTypes: null
        },
        sendSettings: {
          type: 2,
          time: '01/10/2020',
          event: null
        }
      },
      link: 'https://www.just4u.co.il/SelectActivity?id=_KRwPtbHB4Iw-evO9OMxWA2',
      image:  'https://www.just4u.co.il/Pictures/zoom-gibush.jpg',
      title: 'גיבושי זום',
      cardData: [
        {
          title: "תקציב שהוקצה",
          description: '100,000 ₪'
        },
        {
          title: "נוצל מהתקציב",
          description: '68,000 ₪'
        },
        {
          title: 'תאריך יצירה',
          description: '01/09/2020'
        },
        {
          title: "מס' שיוכים",
          description: '64'
        }
      ],
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createActivity() {
    this.router.navigate(['activities-management/create-activity']);
  }

}
