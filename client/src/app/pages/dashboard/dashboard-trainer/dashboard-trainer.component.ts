import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { _login_route } from 'src/app/_data/_route';
import { _TrainerSideBoard } from 'src/app/_data/_sideBarContent';
import { Role } from 'src/app/_model/_Enum/Role';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard-trainer',
  templateUrl: './dashboard-trainer.component.html',
  styleUrls: ['./dashboard-trainer.component.css'],
})
export class DashboardTrainerComponent {
  SideboardContent: any[] = [];

  constructor(private authS: AuthService, private router: Router) {
    this.authS.checkIfRole(Role.trainer).then(
      (res) => {
        if (res) {
          this.SideboardContent = _TrainerSideBoard;
        } else {
          this.router.navigate([_login_route]);
        }
      },
      () => {
        this.router.navigate([_login_route]);
      }
    );
  }
}
