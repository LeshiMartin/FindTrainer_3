import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-trainer-account',
  templateUrl: './dashboard-trainer-account.component.html',
  styleUrls: ['./dashboard-trainer-account.component.css'],
})
export class DashboardTrainerAccountComponent implements OnInit {
  AccountForm: FormGroup;
  // initData: SignUpDTO = {
  //   email: 'sdasdasdas@gmail.com',
  //   password: 'Password123@',
  //   role: 1,
  //   gender: 1,
  //   name: 'Eric',
  //   profileUrl: null,
  // };
  constructor() {}

  ngOnInit(): void {}
}
