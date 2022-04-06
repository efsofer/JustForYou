import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() type;
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

  openProductPage() {
    window.open('https://www.just4u.co.il/coupon/1430');
  }

}
