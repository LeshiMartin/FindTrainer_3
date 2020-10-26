import { LandingComponent } from './pages/landing/landing.component';
import {
  _trainers_route,
  _signup_route,
  _login_route,
  _editCertification_route,
  _myMessages_route,
  _dashboardStats_route,
  _landing_route,
  _editAccount,
} from './_data/_route';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltrainersComponent } from './pages/alltrainers/alltrainers.component';
import { DashboardCertificationsComponent } from './pages/dashboard/dashboard-certifications/dashboard-certifications.component';
import { DashboardMessagesComponent } from './pages/dashboard/dashboard-messages/dashboard-messages.component';
import { DashboardSettingsComponent } from './pages/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardStatsComponent } from './pages/dashboard/dashboard-stats/dashboard-stats.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingletrainerComponent } from './pages/singletrainer/singletrainer.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer-account/dashboard-trainer-account.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user-account/dashboard-user-account.component';

const routes: Routes = [
  { path: _login_route, component: LoginComponent },
  { path: _signup_route, component: SignupComponent },
  { path: _trainers_route, component: AlltrainersComponent },
  { path: `${_trainers_route}/:id`, component: SingletrainerComponent },
  { path: _landing_route, component: LandingComponent },
  //=============================== These routes below can only be access by user
  {
    path: _editAccount,
    component: DashboardUserAccountComponent,
  },
  //=============================== These routes above can only be access by user
  //=============================== These routes below can only be access by trainer
  {
    path: _editAccount,
    component: DashboardTrainerAccountComponent,
  },
  {
    path: _editCertification_route,
    component: DashboardCertificationsComponent,
  },
  {
    path: _myMessages_route,
    component: DashboardMessagesComponent,
  },

  {
    path: _dashboardStats_route,
    component: DashboardStatsComponent,
  },
  //=============================== These routes above can only be access by trainer
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// {
//   path: '',
//   runGuardsAndResolvers: 'always',

//   canActivate: [AuthGuard],
//   children: [
//     {
//       path: _editAccount_route, //this route can be access both trainer and users
//       component: DashboardAccountsComponent,
//     },
//     //=============================== These routes below can only be access by trainer
//     {
//       path: _editCertification_route,
//       component: DashboardCertificationsComponent,
//     },
//     {
//       path: _myMessages_route,
//       component: DashboardMessagesComponent,
//     },
//     {
//       path: _settings_route,
//       component: DashboardSettingsComponent,
//     },
//     {
//       path: _dashboardStats_route,
//       component: DashboardStatsComponent,
//     },
//     {
//       path: _dashboardHome_route,
//       component: DashboardHomeComponent,
//     },
//     //=============================== These routes above can only be access by trainer
//   ],
// },
