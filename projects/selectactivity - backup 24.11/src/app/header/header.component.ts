import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pkgHeader: any = null;
  employeeName: string = "עובד/ת יקר/ה";

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.pkgHeader.subscribe(data => this.pkgHeader = data);
    this._http.employee.subscribe((data: any) => {if (data != null) this.employeeName = data.Name});
  }
}