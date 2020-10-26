import { _login_route } from './../_data/_route';
import { Role } from './../_model/_Enum/Role';
import { SignupBaseToTrainer } from './../_methods/_autoMapper';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { SignUpDTO } from '../_model/_Dto/BaseUserDTO';
import { map, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    // private functions: AngularFireFunctions,
    private tAlert: ToastrService
  ) {}
  checkIfUser() {
    return this.afAuth.authState.pipe(
      map((res) => {
        if (res) {
          console.log('res', res);
          return true;
        }
        this.router.navigate([_login_route]);
        return false;
      })
    );
  }
  async checkIfTrainer(): Promise<boolean> {
    return this.afAuth.authState
      .pipe(
        map((res) => {
          if (res) {
            return res.getIdTokenResult().then((d) => d.claims.isTrainer);
          }
          return false;
        })
      )
      .toPromise()
      .then((res) => !!res)
      .catch((err) => {
        this.tAlert.error(err);
        return false;
      });
  }

  private updateUserData(uid: string, signupData: SignUpDTO): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    //Trainer
    signupData.profileUrl = null;
    const data = SignupBaseToTrainer(signupData, uid);
    if (signupData.role === Role.trainer) {
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

  async signUp(signupData: SignUpDTO) {
    const data = await this.afAuth.createUserWithEmailAndPassword(
      signupData.email,
      signupData.password
    );
    return this.updateUserData(data.user.uid, signupData);
  }
}
