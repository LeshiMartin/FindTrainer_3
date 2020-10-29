import {
  _trainer_certification,
  _trainer_reviews,
  _trainers_route,
} from './../../_data/_route';
import { ISidebarContent } from './../../_model/_Interface/ISidebar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UserService } from 'src/app/_services/user.service';
import { _trainer_send_message } from 'src/app/_data/_route';
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
      const id = params.get('id');
      this.sideBarContent = this.sideBarContent.map((e) => {
        return { ...e, route: `${_trainers_route}/${id}/${e.route}` };
      });
      this.getTrainer(id);
    });
  }
  sideBarContent: ISidebarContent[] = [
    {
      name: 'Contact Me',
      icon: 'far fa-envelope',
      route: _trainer_send_message,
    },
    {
      name: 'Certifications',
      icon: 'far fa-id-badge',
      route: _trainer_certification,
    },
    {
      name: 'Reviews',
      icon: 'far fa-star',
      route: _trainer_reviews,
    },
  ];
  ngOnInit(): void {}

  getTrainer(id: string) {
    this.userService
      .getSingleUser(id)
      .subscribe((res: TrainerDTO) => (this.currentTrainer = res));
  }
}
