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

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    ValidateComponent,
    HeaderComponent,
    SelectedComponent,
    EncodeSpacesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
