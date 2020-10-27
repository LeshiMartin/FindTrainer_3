import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateTrainerAccountDTO } from 'src/app/_model/_Dto/SettingDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard-trainer-account',
  templateUrl: './dashboard-trainer-account.component.html',
  styleUrls: ['./dashboard-trainer-account.component.css'],
})
export class DashboardTrainerAccountComponent implements OnInit {
  AccountForm: FormGroup;
  initData: UpdateTrainerAccountDTO = {
    focus: [],
    city: '',
    province: '',
    country: '',
    fullAddress: '',
    onlineTraining: true,
  };
  constructor(
    private userS: UserService,
    private authS: AuthService,
    private fb: FormBuilder
  ) {
    this.getTrainerProfile();
  }
  ngOnInit(): void {
    this.AccountForm = this.fb.group({
      name: [this.initData.name, [Validators.required]],
      gender: [this.initData.gender, [Validators.required]],
      email: [
        this.initData.email,
        [Validators.pattern(this.emailOnly), Validators.required],
      ],
      password: [
        this.initData.password,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
    });
  }

  getTrainerProfile() {
    this.authS.checkIfLogin().subscribe((res) => {
      if (res) {
        const { uid } = res;
        this.userS
          .getSingleUser(uid)
          .subscribe((res2: UpdateTrainerAccountDTO) => {
            if (res2) {
              this.initData = res2;
              console.log('this.initData', this.initData);
            }
          });
      }
    });
  }
}
