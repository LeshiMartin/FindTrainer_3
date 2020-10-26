import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  _TrainerSideBoard,
  _UserSideboard,
} from 'src/app/_data/_sideBarContent';
import { AllTrainersDTO } from 'src/app/_model/_Dto/TrainerDTO';
import { Role } from 'src/app/_model/_Enum/Role';
import { IBaseUser } from 'src/app/_model/_Interface/IBaseUser';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})
export class DashboardSidebarComponent {
  @Input() SideboardList: any[] = [];
  constructor() {}
}
