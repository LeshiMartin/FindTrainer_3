import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-singletrainer',
  templateUrl: './singletrainer.component.html',
  styleUrls: ['./singletrainer.component.scss'],
})
export class SingletrainerComponent implements OnInit {
  currentTrainer: TrainerDTO;
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
    this.userService.getSingleUser(id).subscribe((res: TrainerDTO) => {
      this.currentTrainer = res;
    });
  }
  /////////////////////////////////////////////////////////////////////
  closeResult = '';
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  rating(rate) {
    this.modalService
      .open(rate, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
