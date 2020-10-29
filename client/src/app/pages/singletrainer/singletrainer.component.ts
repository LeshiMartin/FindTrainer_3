import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-singletrainer',
  templateUrl: './singletrainer.component.html',
  styleUrls: ['./singletrainer.component.scss'],
})
export class SingletrainerComponent implements OnInit {
  currentTrainer: TrainerDTO = null;
  constructor(
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.getTrainer(params.get('id'));
    });
  }

  ngOnInit(): void {}

  getTrainer(id: string) {
    this.userService
      .getSingleUser(id)
      .subscribe((res: TrainerDTO) => (this.currentTrainer = res));
  }
  /////////////////////////////////////////////////////////////////////
}
