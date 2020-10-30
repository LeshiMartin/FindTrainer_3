import { BaseUserDTO } from './../_model/_Dto/BaseUserDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { _collection_users } from '../_data/_collections';
import { TrainerDTO } from '../_model/_Dto/BaseUserDTO';
import { FilterParams } from '../_model/_Dto/FilterParamsDTO';
import { AuthService } from './auth.service';
import { Role } from '../_model/_Enum/Role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private CurrentBrowseTrainer = new BehaviorSubject<string>(null);
  currentBrowseTrainer$ = this.CurrentBrowseTrainer.asObservable();
  constructor(
    private AuthS: AuthService,
    private afStore: AngularFirestore,
    private _http: HttpClient,
    private toastR: ToastrService
  ) {}

  getAll(filterParams: FilterParams): AngularFirestoreCollection<TrainerDTO> {
    return this.afStore.collection(
      _collection_users,
      (ref: CollectionReference) => {
        let refQuery = ref.where('role', '==', 1);

        //Search
        if (filterParams.Search) {
          refQuery = refQuery.where('name', '==', filterParams.Search);
        }
        //Advanced Search
        if (filterParams.Gender < 1) {
          refQuery = refQuery.where('gender', '==', filterParams.Gender);
        }
        if (filterParams.OnlineTraining < 1) {
          refQuery = refQuery.where(
            'onlineTraining',
            '==',
            filterParams.OnlineTraining === 0 ? false : true
          );
        }
        //Base
        refQuery = refQuery
          .orderBy('avgRatingScore', 'desc')
          .orderBy('totalRatings', 'desc');
        ///Paging
        if (filterParams.LastItem) {
          return refQuery.startAfter(filterParams.LastItem).limit(6);
        } else if (filterParams.FirstItem.length > 0) {
          return refQuery
            .endAt(filterParams.FirstItem[filterParams.FirstItem.length - 1])
            .limitToLast(6);
        } else {
          return refQuery.limit(6);
        }
      }
    );
  }
  getSingleUser(id: string) {
    return this.afStore
      .collection(_collection_users)
      .doc(id)
      .get()
      .pipe(
        map((res) => {
          this.CurrentBrowseTrainer.next(id);
          return { ...res.data(), uid: id };
        })
      );
  }
  getSingleTrainer(id: string) {
    return this.getSingleUser(id).pipe(
      map((res: TrainerDTO | BaseUserDTO) => {
        return res.role === Role.trainer ? res : null;
      })
    );
  }
  uploadImage(vals): Observable<any> {
    let data = vals;
    return this._http.post(
      'https://api.cloudinary.com/v1_1/codexmaker/image/upload',
      data
    );
  }
  EditUser(data: TrainerDTO): Promise<void> {
    return this.afStore
      .collection(_collection_users)
      .doc(data.uid)
      .set(data, { merge: true });
  }
  getCurrentUser() {
    return this.AuthS.checkIfLogin().pipe(
      switchMap((res) => {
        if (res) {
          return this.getSingleUser(res.uid);
        }
        return null;
      })
    );
  }
}
