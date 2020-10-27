import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _collection_users } from '../_data/_collections';
import { TrainerDTO } from '../_model/_Dto/BaseUserDTO';
import { FilterParams } from '../_model/_Dto/FilterParamsDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afStore: AngularFirestore, private _http: HttpClient) {}

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
          return { ...res.data(), uid: id };
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
  EditUser(data: TrainerDTO) {
    return this.afStore
      .collection(_collection_users)
      .doc(data.uid)
      .set(data, { merge: true });
  }
}
