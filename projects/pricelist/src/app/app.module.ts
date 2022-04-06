import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PricelistComponent } from './pricelist/pricelist.component';
import { EncodeSpacesPipe } from './encode-spaces.pipe';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoDialogComponent } from 'projects/customer-portal/src/app/dialogs/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PricelistComponent,
    EncodeSpacesPipe,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
