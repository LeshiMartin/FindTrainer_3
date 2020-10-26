import { SignUpTrainerDTO } from './../_model/_Dto/BaseUserDTO';
import { SignUpDTO } from 'src/app/_model/_Dto/BaseUserDTO';
export const SignupBaseToTrainer = (a: SignUpDTO, uid: string) => {
  return new SignUpTrainerDTO(uid, a.role, a.gender, a.name, a.profileUrl);
};
