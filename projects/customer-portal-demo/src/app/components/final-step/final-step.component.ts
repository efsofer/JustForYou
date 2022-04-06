import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent implements OnInit {
  @Input() message;
  @Input() btnLabel;
  @Input() btnLink;
  constructor() { }

  ngOnInit(): void {
  }

}
