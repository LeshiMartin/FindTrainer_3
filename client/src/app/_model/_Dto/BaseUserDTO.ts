import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';
import { ITrainer } from '../_Interface/ITrainer';
import { IBaseUser } from './../_Interface/IBaseUser';
interface IAuth {
  email: string;
  password: string;
}
export class SignUpDTO implements IBaseUser, IAuth {
  email: string;
  password: string;
  role: Role;
  gender: Gender;
  name: string;
  profileUrl: string;
}
export class SignInDTO implements IAuth {
  email: string;
  password: string;
}

export class SignUpTrainerDTO implements ITrainer {
  uid: string;
  role: Role;
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
  avgRatingScore: number;
  totalRatings: number;
  onlineTraining: boolean = true;
  constructor(
    uid: string,
    role: Role,
    gender: Gender,
    name: string,
    profileUrl: string
  ) {
    this.uid = uid;
    this.role = role;
    this.gender = gender;
    this.name = name;
    this.profileUrl = profileUrl;
    this.focus = [];
    this.city = null;
    this.province = null;
    this.country = null;
    this.fullAddress = null;
    this.avgRatingScore = 0;
    this.totalRatings = 0;
  }
}
