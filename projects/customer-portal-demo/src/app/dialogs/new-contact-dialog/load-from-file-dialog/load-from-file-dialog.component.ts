import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-from-file-dialog',
  templateUrl: './load-from-file-dialog.component.html',
  styleUrls: ['./load-from-file-dialog.component.scss']
})
export class LoadFromFileDialogComponent implements OnInit {
  @Input() fileType = '.xlsx';
  showInstructions = false;
  constructor() { }

  ngOnInit(): void {
    if (this.fileType === '.xlsx') {
      this.showInstructions = true;
    } else {
      this.showInstructions = false;
    }
  }

}
