import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contact-type-dialog',
  templateUrl: './add-contact-type-dialog.component.html',
  styleUrls: ['./add-contact-type-dialog.component.scss']
})
export class AddContactTypeDialogComponent implements OnInit {
  name;
  selectedOption;
  options;
  constructor() { }

  ngOnInit(): void {
  }

}
