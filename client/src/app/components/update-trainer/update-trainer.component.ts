import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UpdateTrainerAccountDTO } from 'src/app/_model/_Dto/SettingDTO';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-trainer',
  templateUrl: './update-trainer.component.html',
  styleUrls: ['./update-trainer.component.css'],
})
export class UpdateTrainerComponent implements OnInit {
  @Input() fullData: TrainerDTO;
  TrainerFormAccount: FormGroup;
  initData: UpdateTrainerAccountDTO = {
    focus: [],
    city: '',
    province: '',
    country: '',
    fullAddress: '',
    onlineTraining: true,
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
    this.TrainerFormAccount = this.fb.group({
      city: [this.initData.city, [Validators.required]],
      country: [this.initData.country, [Validators.required]],
      province: [this.initData.province, [Validators.required]],
      fullAddress: [this.initData.fullAddress, [Validators.required]],
      onlineTraining: [this.initData.onlineTraining, [Validators.required]],
      focus: [this.initData.focus, [Validators.required]],
    });
  }

  submitFunc(): void {
    const form = this.TrainerFormAccount.value;
    console.log('form', form);
    const allData = { ...this.fullData, ...this.TrainerFormAccount.value };
    console.log('allData', allData);

    this.userService
      .EditUser(allData)
      .then(() => {})
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
}
