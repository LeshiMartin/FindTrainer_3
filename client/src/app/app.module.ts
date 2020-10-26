import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RatingModule } from 'ngx-bootstrap/rating'; //Ngx-bootstrap

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SingletrainerComponent } from './pages/singletrainer/singletrainer.component';
import { AlltrainersComponent } from './pages/alltrainers/alltrainers.component';
import { AccountComponent } from './pages/account/account.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FormsModule } from '@angular/forms';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainerItemComponent } from './components/trainer-item/trainer-item.component';
import { RatingComponent } from './components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { DashboardMessagesComponent } from './pages/dashboard/dashboard-messages/dashboard-messages.component';
import { DashboardAccountsComponent } from './pages/dashboard/dashboard-accounts/dashboard-accounts.component';
import { DashboardSettingsComponent } from './pages/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardSidebarComponent } from './pages/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardStatsComponent } from './pages/dashboard/dashboard-stats/dashboard-stats.component';
import { DashboardCertificationsComponent } from './pages/dashboard/dashboard-certifications/dashboard-certifications.component';
import { DashboardBlogsComponent } from './pages/dashboard/dashboard-blogs/dashboard-blogs.component';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer-account/dashboard-trainer-account.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user-account/dashboard-user-account.component';
import { DashboardSidebarUserComponent } from './pages/dashboard/dashboard-sidebar-user/dashboard-sidebar-user.component';
import { DashboardSidebarTrainerComponent } from './pages/dashboard/dashboard-sidebar-trainer/dashboard-sidebar-trainer.component';
import { DashboardTrainerComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer.component';
import { DashboardUserComponent } from './pages/dashboard/dashboard-user/dashboard-user.component';
// 2. Add your credentials from step 1

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SingletrainerComponent,
    AlltrainersComponent,
    AccountComponent,
    LandingComponent,
    TrainerItemComponent,
    RatingComponent,
    DashboardMessagesComponent,
    DashboardAccountsComponent,
    DashboardSettingsComponent,
    DashboardSidebarComponent,
    DashboardStatsComponent,
    DashboardCertificationsComponent,
    DashboardBlogsComponent,
    DashboardHomeComponent,
    DashboardTrainerAccountComponent,
    DashboardUserAccountComponent,
    DashboardSidebarUserComponent,
    DashboardSidebarTrainerComponent,
    DashboardTrainerComponent,
    DashboardUserComponent,
  ],
  imports: [
    RatingModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
