import { _dashboardHome_route } from './../../_data/_route';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  developerForm: FormGroup;
  initData: SignUpDTO = {
    email: 'sdasdasdas@gmail.com',
    password: 'Password123@',
    role: 1,
    gender: 1,
    name: 'Eric',
    profileUrl: null,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit(): void {
    this.developerForm = this.fb.group({
      role: [this.initData.role, [Validators.required]],
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

  submitFunc(): void {
    const form = this.developerForm.value;
    this.authService
      .signUp(form)
      .then(() => {
        this.router.navigate([_dashboardHome_route]);
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
}
