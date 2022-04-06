import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { CheckVoucherComponent } from './check-voucher/check-voucher.component';
import { AdminComponent } from './admin/admin.component';
import { PickBenefitComponent } from './pick-benefit/pick-benefit.component';
import { ConvertComponent } from './convert/convert.component';
import { ShookbookComponent } from './shookbook/shookbook.component';

const routes: Routes = [
  {path: 'shookbook', component: ShookbookComponent},
  {path: 'convert', component: ConvertComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'pick', component: PickBenefitComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', component: CheckVoucherComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
