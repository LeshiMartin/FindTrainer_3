import { LandingComponent } from './pages/landing/landing.component';
import {
  _trainers_route,
  _signup_route,
  _login_route,
  _editAccount_route,
  _editCertification_route,
  _myMessages_route,
  _dashboardStats_route,
  _dashboardHome_route,
  _landing_route,
  _settings_route,
} from './_data/_route';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltrainersComponent } from './pages/alltrainers/alltrainers.component';
import { DashboardAccountsComponent } from './pages/dashboard/dashboard-accounts/dashboard-accounts.component';
import { DashboardCertificationsComponent } from './pages/dashboard/dashboard-certifications/dashboard-certifications.component';
import { DashboardMessagesComponent } from './pages/dashboard/dashboard-messages/dashboard-messages.component';
import { DashboardSettingsComponent } from './pages/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardStatsComponent } from './pages/dashboard/dashboard-stats/dashboard-stats.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingletrainerComponent } from './pages/singletrainer/singletrainer.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: _login_route, component: LoginComponent },
  { path: _signup_route, component: SignupComponent },
  { path: _trainers_route, component: AlltrainersComponent },
  { path: `${_trainers_route}/:id`, component: SingletrainerComponent },
  { path: _landing_route, component: LandingComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: _editAccount_route, //this route can be access both trainer and users
        component: DashboardAccountsComponent,
      },
      //=============================== These routes below can only be access by trainer
      {
        path: _editCertification_route,
        component: DashboardCertificationsComponent,
      },
      {
        path: _myMessages_route,
        component: DashboardMessagesComponent,
      },
      {
        path: _settings_route,
        component: DashboardSettingsComponent,
      },
      {
        path: _dashboardStats_route,
        component: DashboardStatsComponent,
      },
      {
        path: _dashboardHome_route,
        component: DashboardHomeComponent,
      },
      //=============================== These routes above can only be access by trainer
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
