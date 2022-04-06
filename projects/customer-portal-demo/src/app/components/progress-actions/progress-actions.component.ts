import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-actions',
  templateUrl: './progress-actions.component.html',
  styleUrls: ['./progress-actions.component.scss']
})
export class ProgressActionsComponent implements OnInit, OnDestroy {
  public currentIndex: number;
  public subscription: Subscription;
  showBtn = true;
  isDisabled = false;

  @Input() idxLength: number;
  @Input() data = [
    {
      type: 1,  // אנשי קשר
      quantity: 1050
    },
    {
      type: 2,  // שוברים
      quantity: 2
    },
  ];
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.subscription = this.progressService.getCurrentIndex().subscribe((idx) => {
      this.currentIndex = idx;
    });
  }

  skipBtn() {
    this.progressService.skip(this.currentIndex + 1);
  }
  backBtn() {
    this.progressService.back(this.currentIndex - 1);
  }
  nextBtn() {
    this.progressService.next(this.currentIndex + 1);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
