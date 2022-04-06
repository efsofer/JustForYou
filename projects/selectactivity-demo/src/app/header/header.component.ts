import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  order: any;
  employeeName: string = "עובד/ת יקר/ה";

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.order.subscribe(data => this.order = data);
    this._http.employee.subscribe((data: any) => {if (data.hasOwnProperty('workername')) this.employeeName = data.workername});
  }
}