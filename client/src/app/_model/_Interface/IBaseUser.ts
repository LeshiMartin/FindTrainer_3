import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';

export interface IBaseUser {
  gender: Gender;
  name: string;
  profileUrl: string;
}
