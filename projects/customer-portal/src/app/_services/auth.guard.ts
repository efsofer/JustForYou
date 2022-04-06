import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../http.service';

const LOGIN_TIMEOUT: number = 1209600000; // 14 Days

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('hr_lastLogin') && new Date().valueOf() - new Date(localStorage.getItem('hr_lastLogin')).valueOf() < LOGIN_TIMEOUT) {
            if (this.http.token && this.http.username && this.http.password && this.http.dealerId) return true;
            this.http.token = localStorage.getItem('j4u_hrtoken') ? localStorage.getItem('j4u_hrtoken') : '';
            this.http.username = localStorage.getItem('hrstuff') ? JSON.parse(localStorage.getItem('hrstuff')).username : '';
            this.http.password = localStorage.getItem('hrstuff') ? JSON.parse(localStorage.getItem('hrstuff')).password : '';
            this.http.dealerId = localStorage.getItem('hrstuff') ? parseInt(JSON.parse(localStorage.getItem('hrstuff')).id) : 0;
            if (this.http.token && this.http.username && this.http.password && this.http.dealerId) return true;
        }
        // not logged in so redirect to login page with the return url
        if (route.queryParamMap.get('tbid')) {
            this.router.navigate(['/login'], { queryParams: { tbid: route.queryParamMap.get('tbid') }});
        }
        else this.router.navigate(['/login']); //, { queryParams: { returnUrl: state.url }});
        return false;
    }
}