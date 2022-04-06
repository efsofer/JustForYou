import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teambuild-details',
  templateUrl: './teambuild-details.component.html',
  styleUrls: ['./teambuild-details.component.scss']
})
export class TeambuildDetailsComponent implements OnInit {
  private _data: any;
  @Input() set data(value: any) {
    if (!value) return;
    this._data = value;
    this.choice = this._data.TBHistory[0];
    this.updateChoice()
  }
  get data(): any {
    return this._data;
  }

  choice = null;
  expandedItem: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  updateChoice() {
    if (!this.choice.id) {
      this.choice.TeamBuildItems = [];
      let temp = [];
      for (let line of this.choice.Lines) {
        if (!temp.includes(line.itemid)) {
          temp.push(line.itemid);
          let item = {
            Name: line.Name,
            image1: line.Picture1
          }
          this.choice.TeamBuildItems.push(item);
        }
      }
    }
  }

}
