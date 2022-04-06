import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CouponsManagementComponent } from './pages/coupons-management/coupons-management.component';
import { ActivitiesManagementComponent } from './pages/activities-management/activities-management.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { ContactsManagementComponent } from './pages/contacts-management/contacts-management.component';
import { AccountTransactionsComponent } from './pages/account-transactions/account-transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CouponDetailsComponent } from './pages/coupon-details/coupon-details.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';
import { IncentivesManagementComponent } from './pages/incentives-management/incentives-management.component';
import { IncentivesDetailsComponent } from './pages/incentives-details/incentives-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  // {
  //  path : 'activities-management' ,
  //  children : [
  //   { path: '', component: ActivitiesManagementComponent },
  //   { path: ':id', component: ActivityDetailsComponent }
  //  ]
  // },
  {path: 'coupons-management', component: CouponsManagementComponent},
  {path: 'coupons-management/:id', component: CouponDetailsComponent},
  {path: 'activities-management', component: ActivitiesManagementComponent},
  {path: 'activities-management/create-activity', component: ActivityCreateComponent},
  {path: 'activities-management/:id', component: ActivityDetailsComponent},
  {path: 'incentives-management', component: IncentivesManagementComponent},
  {path: 'incentives-management/:id', component: IncentivesDetailsComponent},
  {path: 'orders-management', component: OrdersManagementComponent},
  {path: 'orders-management/:id', component: OrderDetailsComponent},
  {path: 'contacts-management', component: ContactsManagementComponent},
  {path: 'account-transactions', component: AccountTransactionsComponent},
  {path: 'settings', component: SettingsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
