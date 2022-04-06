import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';

@Component({
  selector: 'app-activity-create-summery',
  templateUrl: './activity-create-summery.component.html',
  styleUrls: ['./activity-create-summery.component.scss']
})
export class ActivityCreateSummeryComponent implements OnInit {
  display = false;
  type = 1;
  showCancelButton = false;
  mockData = {
    type: 1,
    activitisTypeDetails: {
      contactsSetting: {
        selectType: 2, // ידני
        quantity: 200,
        contactTypes: null
      },
      sendSettings: {
        type: 1, // באופן מיידי
        time: 'מייד',
        event: null
      }
    },
    payment: [
      {
        title: 'בוטיק & ספא - סופ"ש פרימיום',
        amount: '₪100'
      },
      {
        title: 'חגיגת בוקר',
        amount: '₪100'
      },
      {
        title: 'סעודה זוגית',
        amount: '₪300'
      },
      {
        title: 'סכום מקסימלי לתשלום עבור פעילות זאת:',
        amount: '₪60000',
      }
    ],
  };
  mockData2 = {
    type: 2,
    activitisTypeDetails: {
      contactsSetting: {
        selectType: 1, // אוטומטי
        quantity: 200,
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
  };
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  selectFile(e) {
    if (e.currentFiles.length > 0) {
      this.showCancelButton = true;
    }
  }

  removeFile(e) {
    this.showCancelButton = false;
  }

  goTo(i) {
    this.progressService.goToStep(i);
  }


}
