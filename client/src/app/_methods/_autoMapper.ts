import { SignUpTrainerDTO } from './../_model/_Dto/BaseUserDTO';
import { SignUpDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { AllTrainersDTO } from '../_model/_Dto/TrainerDTO';
import { UpdateTrainerAccountDTO } from '../_model/_Dto/SettingDTO';
export const SignupBaseToTrainer = (a: SignUpDTO, uid: string) => {
  return new SignUpTrainerDTO(uid, a.role, a.gender, a.name, a.profileUrl);
};

export const AllTrainerToUpdateTrainerProfile = (
  a: AllTrainersDTO,
  b: UpdateTrainerAccountDTO
): UpdateTrainerAccountDTO => {
  return Object.assign(b, a);
};
