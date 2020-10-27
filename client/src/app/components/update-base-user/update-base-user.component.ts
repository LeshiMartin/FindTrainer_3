import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseUserDTO, TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UpdateAccountDTO } from 'src/app/_model/_Dto/SettingDTO';
import { Gender } from 'src/app/_model/_Enum/Gender';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-base-user',
  templateUrl: './update-base-user.component.html',
  styleUrls: ['./update-base-user.component.css'],
})
export class UpdateBaseUserComponent implements OnInit {
  @Input() fullData: TrainerDTO | BaseUserDTO;
  AccountForm: FormGroup;
  initData: UpdateAccountDTO = {
    name: '',
    gender: Gender.male,
  };

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.dataTransferInit();
  }
  dataTransferInit() {
    Object.assign(this.fullData, this.initData);
  }
  ngOnInit(): void {
    this.AccountForm = this.fb.group({
      name: [this.initData.name, [Validators.required]],
      gender: [this.initData.gender, [Validators.required]],
    });
  }

  submitFunc(): void {
    const form = this.AccountForm.value;
    console.log('form', form);
    const allData = { ...this.fullData, ...this.AccountForm.value };
    console.log('allData', allData);

    this.userService
      .EditUser(allData)
      .then(() => {})
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
}
