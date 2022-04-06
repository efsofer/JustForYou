import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from './select/select.component';
import { ValidateComponent } from './validate/validate.component';
import { HeaderComponent } from './header/header.component';
import { SelectedComponent } from './selected/selected.component';
import { EncodeSpacesPipe } from './encode-spaces.pipe';
import { FooterComponent } from './footer/footer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SelectHomeComponent } from './select-home/select-home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    ValidateComponent,
    HeaderComponent,
    SelectedComponent,
    EncodeSpacesPipe,
    FooterComponent,
    SafeHtmlPipe,
    SelectHomeComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
