import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CheckVoucherComponent } from './check-voucher/check-voucher.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { AdminComponent } from './admin/admin.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { PickBenefitComponent } from './pick-benefit/pick-benefit.component';
import { ShookbookComponent } from './shookbook/shookbook.component';
import { ConvertComponent } from './convert/convert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DeliveryComponent,
    CheckVoucherComponent,
    AdminComponent,
    SafeHtmlPipe,
    PickBenefitComponent,
    ShookbookComponent,
    ConvertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
