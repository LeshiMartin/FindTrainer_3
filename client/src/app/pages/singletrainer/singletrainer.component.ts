import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllTrainersDTO } from 'src/app/_model/_Dto/TrainerDTO';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-singletrainer',
  templateUrl: './singletrainer.component.html',
  styleUrls: ['./singletrainer.component.scss'],
})
export class SingletrainerComponent implements OnInit {
  currentTrainer: AllTrainersDTO = new AllTrainersDTO();
  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.getTrainer(params.get('id'));
    });
  }

  ngOnInit(): void {}

  getTrainer(id: string) {
    this.userService.getSingleUser(id).subscribe((res: AllTrainersDTO) => {
      this.currentTrainer = res;
    });
  }
}
