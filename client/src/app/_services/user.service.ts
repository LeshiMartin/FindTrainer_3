import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  CollectionReference,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { _users } from '../_data/_collections';
import { FilterParams } from '../_model/_Dto/FilterParamsDTO';
import { AllTrainersDTO } from '../_model/_Dto/TrainerDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afStore: AngularFirestore) {}

  getAll(
    filterParams: FilterParams
  ): AngularFirestoreCollection<AllTrainersDTO> {
    return this.afStore.collection(_users, (ref: CollectionReference) => {
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
    });
  }
  getSingleUser(id: string) {
    return this.afStore
      .collection('users')
      .doc(id)
      .get()
      .pipe(
        map((res) => {
          return { ...res.data(), uid: id };
        })
      );
  }
}