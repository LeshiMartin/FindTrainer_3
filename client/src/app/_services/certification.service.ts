import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { flatMap, map } from 'rxjs/operators';
import { _collection_certifications } from '../_data/_collections';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  constructor(
    private afStore: AngularFirestore,
    private authService: AuthService
  ) {}
  private getAllCertificationsFromOneTrainer(trainerId: string) {
    return this.afStore
      .collection(_collection_certifications, (ref: CollectionReference) => {
        return ref.where('trainerId', '==', trainerId);
      })
      .stateChanges()
      .pipe(
        map((res) =>
          res.map((e) => {
            const data = e.payload.doc.data() as any;
            data.created = new Date(data.created.seconds * 1000);
            data.expired = new Date(data.expired.seconds * 1000);
            return { uid: e.payload.doc.id, ...data };
          })
        )
      );
  }
  getCurrentUserCerts() {
    return this.authService.checkIfLogin().pipe(
      flatMap((res) => {
        if (res) {
          return this.getAllCertificationsFromOneTrainer(res.uid);
        }
        return null;
      })
    );
  }
}
