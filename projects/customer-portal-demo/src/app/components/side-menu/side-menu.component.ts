import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() menuState = false;
  navDetails = [
    {
      path: '',
      name: 'דף הבית',
      icon: 'assets/icons/homepage.svg',
      iconSelected: 'assets/icons/homepage-selected.svg',
      exact: true
    },
    {
      path: '/coupons-management',
      name: 'ניהול שוברים',
      icon: 'assets/icons/coupons.svg',
      iconSelected: 'assets/icons/coupons-selected.svg',
      exact: false
    },
    {
      path: '/activities-management',
      name: 'ניהול פעילויות',
      icon: 'assets/icons/activities.svg',
      iconSelected: 'assets/icons/activities-selected.svg',
      exact: false
    },
    {
      path: '/incentives-management',
      name: 'ניהול תמריצים',
      icon: 'assets/icons/incentives.png',
      iconSelected: 'assets/icons/incentives-selected.png',
      exact: false
    },
    {
      path: '/orders-management',
      name: 'ניהול הזמנות',
      icon: 'assets/icons/orders.svg',
      iconSelected: 'assets/icons/orders-selected.svg',
      exact: false
    },
    {
      path: '/contacts-management',
      name: 'ניהול אנשי קשר',
      icon: 'assets/icons/contacts.svg',
      iconSelected: 'assets/icons/contacts-selected.svg',
      exact: false
    },
    {
      path: '/account-transactions',
      name: 'תנועות בחשבון',
      icon: 'assets/icons/transactions.svg',
      iconSelected: 'assets/icons/transactions-selected.svg',
      exact: false
    },
    {
      path: 'settings',
      name: 'הגדרות',
      icon: 'assets/icons/settings.svg',
      iconSelected: 'assets/icons/settings-selected.svg',
      exact: false
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
