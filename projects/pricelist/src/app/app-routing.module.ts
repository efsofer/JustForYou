import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricelistComponent } from './pricelist/pricelist.component';


const routes: Routes = [
  {path: '', component: PricelistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
