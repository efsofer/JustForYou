import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ChartsModule } from 'ng2-charts';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SliderModule } from 'primeng/slider';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadCashDialogComponent } from './dialogs/load-cash-dialog/load-cash-dialog.component';
import { CouponsManagementComponent } from './pages/coupons-management/coupons-management.component';
import { ActivitiesManagementComponent } from './pages/activities-management/activities-management.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { ContactsManagementComponent } from './pages/contacts-management/contacts-management.component';
import { AccountTransactionsComponent } from './pages/account-transactions/account-transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CouponDetailsComponent } from './pages/coupon-details/coupon-details.component';
import { ContactsCouponsComponent } from './components/contacts-coupons/contacts-coupons.component';
import { RelatedActivitesComponent } from './components/related-activites/related-activites.component';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NewContactDialogComponent } from './dialogs/new-contact-dialog/new-contact-dialog.component';
import { LoadFromFileDialogComponent } from './dialogs/new-contact-dialog/load-from-file-dialog/load-from-file-dialog.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { AddCreditCardDialogComponent } from './dialogs/add-credit-card-dialog/add-credit-card-dialog.component';
import { AddContactTypeDialogComponent } from './dialogs/add-contact-type-dialog/add-contact-type-dialog.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { ContactsActivitiesComponent } from './components/contacts-activities/contacts-activities.component';
import { ResendingDialogComponent } from './dialogs/resending-dialog/resending-dialog.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgressActionsComponent } from './components/progress-actions/progress-actions.component';
import { CreateContactStepComponent } from './components/contacts-coupons/create-contact-step/create-contact-step.component';
import { FinalStepComponent } from './components/final-step/final-step.component';
import { MailSmsComponent } from './components/mail-sms/mail-sms.component';
import { UploadNewLogoComponent } from './components/upload-new-logo/upload-new-logo.component';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';
import { ActivityCreateSettingComponent } from './pages/activity-create/activity-create-setting/activity-create-setting.component';
import { ActivityCreateSelectProductsComponent } from './pages/activity-create/activity-create-select-products/activity-create-select-products.component';
import { ActivityCreateSelectContactsComponent } from './pages/activity-create/activity-create-select-contacts/activity-create-select-contacts.component';
import { ActivityCreateSendSettingsComponent } from './pages/activity-create/activity-create-send-settings/activity-create-send-settings.component';
import { ActivityCreateSummeryComponent } from './pages/activity-create/activity-create-summery/activity-create-summery.component';
import { CouponDetailsDialogComponent } from './dialogs/coupon-details-dialog/coupon-details-dialog.component';
import { ContactResultsDialogComponent } from './dialogs/contact-results-dialog/contact-results-dialog.component';
import { SuggestedImagesDialogComponent } from './dialogs/suggested-images-dialog/suggested-images-dialog.component';
import { IncentivesManagementComponent } from './pages/incentives-management/incentives-management.component';
import { IncentivesDetailsComponent } from './pages/incentives-details/incentives-details.component';
import { ContactsIncentivesComponent } from './components/contacts-incentives/contacts-incentives.component';




@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SideMenuComponent,
    FooterComponent,
    ContainerComponent,
    HomeComponent,
    CouponsManagementComponent,
    ActivitiesManagementComponent,
    OrdersManagementComponent,
    ContactsManagementComponent,
    AccountTransactionsComponent,
    SettingsComponent,
    PaginatorComponent,
    CardItemComponent,
    PieChartComponent,
    ModalComponent,
    LoadCashDialogComponent,
    CouponDetailsComponent,
    ContactsCouponsComponent,
    RelatedActivitesComponent,
    InputWrapperComponent,
    OrderDetailsComponent,
    BreadcrumbsComponent,
    NewContactDialogComponent,
    LoadFromFileDialogComponent,
    DragAndDropComponent,
    AddCreditCardDialogComponent,
    AddContactTypeDialogComponent,
    ActivityDetailsComponent,
    ContactsActivitiesComponent,
    ResendingDialogComponent,
    ProgressBarComponent,
    ProgressActionsComponent,
    CreateContactStepComponent,
    FinalStepComponent,
    MailSmsComponent,
    UploadNewLogoComponent,
    ActivityCreateComponent,
    ActivityCreateSettingComponent,
    ActivityCreateSelectProductsComponent,
    ActivityCreateSelectContactsComponent,
    ActivityCreateSendSettingsComponent,
    ActivityCreateSummeryComponent,
    CouponDetailsDialogComponent,
    ContactResultsDialogComponent,
    SuggestedImagesDialogComponent,
    IncentivesManagementComponent,
    IncentivesDetailsComponent,
    ContactsIncentivesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PaginatorModule,
    ChartModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    CalendarModule,
    TabViewModule,
    TableModule,
    OverlayPanelModule,
    FileUploadModule,
    TooltipModule,
    ChartsModule,
    InputSwitchModule,
    EditorModule,
    InputTextareaModule,
    RadioButtonModule,
    ScrollingModule,
    VirtualScrollerModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
