import { ITrainer } from './../_Interface/ITrainer';
import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';

export class UpdateProfileDTO {
  focus: string[]; // ex. Bodybuilding, weight loss and etc.
  //address
  city: string;
  province: string;
  country: string;
  fullAddress: string;
}
export class AllTrainersDTO implements ITrainer {
  uid: string;
  role: Role = Role.trainer;
  gender: Gender;
  name: string;
  profileUrl: string;
  //main
  focus: string[];
  created: Date = new Date(Date.now());
  //address
  city: string;
  province: string;
  country: string;
  fullAddress: string;
  //Extra
  avgRatingScore: number = 0;
  totalRatings: number = 0;
  onlineTraining: boolean;
}
