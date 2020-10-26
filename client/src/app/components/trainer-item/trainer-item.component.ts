import { Component, Input } from '@angular/core';
import { AllTrainersDTO } from 'src/app/_model/_Dto/TrainerDTO';

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css'],
})
export class TrainerItemComponent {
  @Input() currentTrainer: AllTrainersDTO;
}
