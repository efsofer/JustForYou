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
import { TeambuildsApproverComponent } from './pages/teambuilds-approver/teambuilds-approver.component';
import { LoginComponent } from './pages/login/login.component';
import { CustsResolver } from './custs.resolve';
import { TBResolver } from './‏teambuilds.resolve';
import { AuthGuard } from './_services/auth.guard';
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
  {path: 'login', component: LoginComponent},
  {path: 'coupons-management', component: CouponsManagementComponent, canActivate: [AuthGuard]},
  {path: 'coupons-management/:id', component: CouponDetailsComponent, canActivate: [AuthGuard]},
  {path: 'activities-management', component: ActivitiesManagementComponent, canActivate: [AuthGuard]},
  {path: 'activities-management/create-activity', component: ActivityCreateComponent, canActivate: [AuthGuard]},
  {path: 'activities-management/:id', component: ActivityDetailsComponent, resolve: {actData: CustsResolver}, canActivate: [AuthGuard]},
  // {path: 'teambuilds-approver', component: TeambuildsApproverComponent, resolve: {TBData: TBResolver}, canActivate: [AuthGuard]},
  {path: 'teambuilds-approver', component: TeambuildsApproverComponent, resolve: {TBData: TBResolver}, canActivate: [AuthGuard]},

  {path: 'incentives-management', component: IncentivesManagementComponent, canActivate: [AuthGuard] },
  {path: 'incentives-management/:id', component: IncentivesDetailsComponent, canActivate: [AuthGuard]},
  {path: 'orders-management', component: OrdersManagementComponent, canActivate: [AuthGuard]},
  {path: 'orders-management/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'contacts-management', component: ContactsManagementComponent, canActivate: [AuthGuard]},
  {path: 'account-transactions', component: AccountTransactionsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
