import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectComponent } from './select/select.component';
import { ValidateComponent } from './validate/validate.component';
import { SelectedComponent } from './selected/selected.component';

const routes: Routes = [
  {path: '', component: ValidateComponent},
  {path: 'select', component: SelectComponent},
  {path: 'selected', component: SelectedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
