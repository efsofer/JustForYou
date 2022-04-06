import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectHomeComponent } from './select-home/select-home.component';
import { ValidateComponent } from './validate/validate.component';
import { SelectedComponent } from './selected/selected.component';

const routes: Routes = [
  {path: '', component: ValidateComponent},
  {path: 'select-home', component: SelectHomeComponent},
  {path: 'selected', component: SelectedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
