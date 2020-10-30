import { ICurrentUser } from './../_model/_Interface/IBaseUser';
import { _collection_users } from './../_data/_collections';
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
import { Observable, BehaviorSubject } from 'rxjs';
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

  //Observables
  private CurrentUserSource = new BehaviorSubject<ICurrentUser>(null);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  //Observables

  checkIfLogin(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Observable<Promise<ICurrentUser>> {
    return this.afAuth.authState.pipe(
      map(async (res) => {
        const token = await res.getIdTokenResult();
        const CurrentUserData: ICurrentUser = {
          uid: res.uid,
          role: !!token.claims[_isTrainer]
            ? Role.trainer
            : !!token.claims[_isUser]
            ? Role.user
            : null,
        };
        this.CurrentUserSource.next(CurrentUserData);
        return CurrentUserData;
      })
    );
  }
  private updateUserData(
    uid: string,
    signupData: SignupDTO,
    role: Role
  ): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${_collection_users}/${uid}`
    );

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
    this.CurrentUserSource.next(null);
    this.router.navigate([_login_route]);
  }

  async signin(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUp(signupData: SignupDTO): Promise<any> {
    const data = await this.afAuth.createUserWithEmailAndPassword(
      signupData.email,
      signupData.password
    );
    const { role, email } = signupData;
    const result = await this.addUserTrainerCustomClaims(role, email);
    this.updateUserData(data.user.uid, signupData, role);
    return result;
  }

  private async addUserTrainerCustomClaims(
    role: Role,
    email: string
  ): Promise<any> {
    const claimFunctionName = role === Role.trainer ? _addTrainer : _addUser;

    const callable = this.functions.httpsCallable(claimFunctionName); // Use the function name from Firebase

    return await callable({ email }).toPromise(); // Create an Observable and pass any data you want to the function
  }
}
