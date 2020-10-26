import {
  _dashboardStats_route,
  _editAccount,
  _editCertification_route,
  _myMessages_route,
} from './_route';
export const _UserSideboard = [
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: _editAccount,
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
