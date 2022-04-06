import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coupon-details-dialog',
  templateUrl: './coupon-details-dialog.component.html',
  styleUrls: ['./coupon-details-dialog.component.scss']
})
export class CouponDetailsDialogComponent implements OnInit {
  @Input() couponData;
  constructor() { }

  ngOnInit(): void {
  }

}
