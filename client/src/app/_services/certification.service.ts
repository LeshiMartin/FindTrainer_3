import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { _collection_certifications } from '../_data/_collections';
import { TrainerDTO } from '../_model/_Dto/BaseUserDTO';
import { CertificationDTO } from '../_model/_Dto/CertificationDTO';
import { AuthService } from './auth.service';
import { GenericsServiceService } from './generics-service.service';
import { Query } from '@firebase/firestore-types';
@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  constructor(
    private afStore: AngularFirestore,
    private authService: AuthService,
    GenericsS: GenericsServiceService
  ) {}
  private getAllCertificationsFromOneTrainer(trainerId: string) {
    return this.afStore
      .collection(_collection_certifications, (ref: CollectionReference) => {
        return ref.where('trainerId', '==', trainerId);
      })
      .stateChanges()
      .pipe(map((res) => res.map((e) => e.payload.doc.data())));
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