import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  showErrors = false;
  loginError = false;
  isLoading = false;
  FName: any
  activities: any;

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    this.showErrors = false;
    this.loginError = false;
    if (this.username == '' || this.password == '') {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    this.http.username = this.username;
    this.http.password = this.password;
    this.http.login().subscribe({
      next: (res: any) => {
        if (res && res.Token) {
          this.http.updateToken(res.Token);
          this.http.dealerId = res.dt[0].Id;
          //this.http.dealerId = res.returnobj[0].id;
          localStorage.setItem('j4u_hrtoken', res.Token);
          localStorage.setItem('hrstuff', JSON.stringify({ username: this.username, password: this.password, id: res.dt[0].Id }));
          localStorage.setItem('hr_lastLogin', new Date().toString());
          this.isLoading = false;
          localStorage.setItem('FName', res.dt[0].FName)
          this.http.getActivities(`${new Date().getFullYear() - 1}-01-01`).subscribe(data => {
            this.http.activities = data
            this.http.sumActivities = this.http.activities.returnobj.length
            if (this.http.activities.returnobj.length > 0)
              this.http.haveActivities = true
            this.http.getVouchers().subscribe(data => {
              this.http.vouchers = data
              this.http.sumVouchers = this.http.vouchers.returnobj.length;
              if (this.http.vouchers.returnobj.length > 0)
                this.http.haveVouchers = true
              this.http.getCusts().subscribe(data => {
                this.http.custs = data
                this.http.sumCusts = this.http.custs.returnobj[0].Custs.length;
                if (this.http.custs.returnobj[0].Custs.length > 0)
                  this.http.haveCusts = true
                if (this.route.snapshot.queryParamMap.get('tbid'))
                  this.router.navigate(['teambuilds-approver'], { queryParamsHandling: 'preserve' });
                else this.router.navigate(['activities-management']);
              })

            })
          })
        }
        else if (res.err) {
          this.loginError = true;
          this.isLoading = false;
          return;
        }
      }, error: () => {
        this.loginError = true;
        this.isLoading = false;
        return;
      }
    });
  }

}