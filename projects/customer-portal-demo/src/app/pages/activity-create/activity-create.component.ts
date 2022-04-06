import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit, OnDestroy {
  public currentIndex: number;
  public subscription: Subscription;
  steps = [
    {
      title: 'הגדרות פעילות',
      isActive: true,
      isDone: false
    },
    {
      title: 'בחירת מוצרים',
      isActive: false,
      isDone: false
    },
    {
      title: 'בחירת אנשים קשר',
      isActive: false,
      isDone: false
    },
    {
      title: 'הגדרות שליחה',
      isActive: false,
      isDone: false
    },
    {
      title: 'אתר מייל וSMS',
      isActive: false,
      isDone: false
    },
    {
      title: 'סיכום',
      isActive: false,
      isDone: false
    },
    {
      title: 'סיום',
      isActive: false,
      isDone: false
    },
  ];
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.subscription = this.progressService.getCurrentIndex().subscribe((idx) => {
      this.currentIndex = idx;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
