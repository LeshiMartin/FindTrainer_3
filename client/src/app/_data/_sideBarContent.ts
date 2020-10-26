import {
  _dashboardHome_route,
  _dashboardStats_route,
  _editAccount_route,
  _editCertification_route,
  _myMessages_route,
  _settings_route,
} from './_route';
export const _UserSideboard = [
  {
    name: 'Dashboard',
    icon: 'fas fa-home',
    route: _dashboardHome_route,
  },
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: _editAccount_route,
  },
  {
    name: 'Setting',
    icon: 'fas fa-cog',
    route: _settings_route,
  },
];
export const _TrainerSideBoard = [
  ..._UserSideboard,
  {
    name: 'Certifications',
    icon: 'fas fa-school',
    route: _editCertification_route,
  },
  {
    name: 'Messages',
    icon: 'fas fa-envelope',
    route: _myMessages_route,
  },
  {
    name: 'Statics',
    icon: 'fas fa-chart-bar',
    route: _dashboardStats_route,
  },
];
