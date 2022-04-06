import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resending-dialog',
  templateUrl: './resending-dialog.component.html',
  styleUrls: ['./resending-dialog.component.scss']
})
export class ResendingDialogComponent implements OnInit {
  @Input() message;
  @Input() success = false;
  @Input() successIsDefultIcon = false;
  constructor() { }

  ngOnInit(): void {
    if(this.successIsDefultIcon) {
      this.success = true;
    }
  }

}
