import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressService } from 'src/app/_services/progress-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit,OnChanges,  OnDestroy {
  public currentIndex: number;
  public subscription: Subscription;
  @Input() steps;
  
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.subscription = this.progressService.getCurrentIndex().subscribe((idx) => {
      this.currentIndex = idx;

      // set style for current item
      this.steps[this.currentIndex].isActive = true;
      this.steps[this.currentIndex].isDone = false;

      // set style for all items AFTER current index (steps that are done)
      if (this.currentIndex >= 1) {
        this.steps[this.currentIndex - 1].isActive = false;
        this.steps[this.currentIndex - 1].isDone = true;
      }

       // set style for all items BEFORE current index (steps that are not done)
      for (let i = this.currentIndex + 1; i < this.steps.length; i++) {
        this.steps[i].isActive = false;
        this.steps[i].isDone = false;
      }

    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
