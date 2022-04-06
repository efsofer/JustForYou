import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  showInstructions = true;
  @Input() fileType = '.xlsx';
  constructor() { }

  ngOnInit(): void {
  }

  onDrop(event: any) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }

  onDragOver(evt) {
    console.log(evt);

    evt.preventDefault();
    evt.stopPropagation();
  }

  onDragLeave(evt) {
    console.log(evt);

    evt.preventDefault();
    evt.stopPropagation();
  }

  upload(event) {
    console.log(event);
  }

  selectFile(e) {
    this.showInstructions = false;
  }

  removeFile(e) {
    this.showInstructions = true;
  }

}
