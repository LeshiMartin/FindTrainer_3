import { _login_route } from './../_data/_route';
import { Role } from './../_model/_Enum/Role';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { _isTrainer, _isUser } from '../_data/_customClaims';
import { _addTrainer, _addUser } from '../_data/_functionNames';
import { SignupDTO } from '../_model/_Dto/BaseUserDTO';
import { SignupBaseToTrainer } from '../_methods/_autoMapper';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private functions: AngularFireFunctions
  ) {}
  checkIfLogin() {
    return this.afAuth.authState;
  }
  checkIfRole(role: Role) {
    return this.afAuth.authState.pipe(
      map(async (res) => {
        if (res) {
          const roleName = role === Role.trainer ? _isTrainer : _isUser;
          const token = await res.getIdTokenResult();
          return !!token.claims[roleName];
        }
        return false;
      })
    );
  }

  findRole() {
    return this.afAuth.authState
      .pipe(
        map(async (res) => {
          if (res) {
            const token = await res.getIdTokenResult();
            if (token.claims[_isTrainer]) {
              return Role.trainer;
            }
            if (token.claims[_isUser]) {
              return Role.user;
            }
            return null;
          }
          return false;
        })
      )
      .toPromise();
  }

  private updateUserData(
    uid: string,
    signupData: SignupDTO,
    role: Role
  ): Promise<void> {
    signupData.profileUrl = null;

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    //Trainer
    if (role === Role.trainer) {
      const data = SignupBaseToTrainer(signupData, uid);
      return userRef.set(
        { ...data },
        {
          merge: true,
        }
      );
    }
    return userRef.set({ ...signupData, uid }, { merge: true });
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate([_login_route]);
  }

  async signin(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUp(signupData: SignupDTO) {
    const data = await this.afAuth.createUserWithEmailAndPassword(
      signupData.email,
      signupData.password
    );
    const { role, email } = signupData;
    const result = await this.addUserTrainerCustomClaims(role, email);
    this.updateUserData(data.user.uid, signupData, role);
    return result;
  }
  private async addUserTrainerCustomClaims(role: Role, email: string) {
    const claimFunctionName = role === Role.trainer ? _addTrainer : _addUser;

    const callable = this.functions.httpsCallable(claimFunctionName); // Use the function name from Firebase

    return await callable({ email }).toPromise(); // Create an Observable and pass any data you want to the function
  }
}
