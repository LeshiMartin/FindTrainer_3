import { Component } from '@angular/core';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard-trainer-account',
  templateUrl: './dashboard-trainer-account.component.html',
  styleUrls: ['./dashboard-trainer-account.component.css'],
})
export class DashboardTrainerAccountComponent {
  userData: TrainerDTO;
  constructor(private userS: UserService, private authS: AuthService) {
    this.getCurrentTrainerData();
  }
  getCurrentTrainerData() {
    this.userS.getCurrentUser().subscribe((res: TrainerDTO) => {
      console.log('res', res);
      this.userData = res;
    });
  }
}
