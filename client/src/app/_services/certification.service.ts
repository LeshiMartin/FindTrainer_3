import { UserService } from 'src/app/_services/user.service';
import { ICurrentUser } from './../_model/_Interface/IBaseUser';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { flatMap, map } from 'rxjs/operators';
import { _collection_certifications } from '../_data/_collections';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CertificationDTO } from '../_model/_Dto/CertificationDTO';
@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  constructor(
    private afStore: AngularFirestore,
    private AS: AuthService,
    private US: UserService
  ) {}

  private getAllCertificationsFromOneTrainer(
    trainerId: string
  ): Observable<CertificationDTO[]> {
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
            return { uid: e.payload.doc.id, ...data } as CertificationDTO;
          })
        )
      );
  }

  getCurrentBrowseingTrainerCerts(): Observable<CertificationDTO[]> {
    return this.US.currentBrowseTrainer$.pipe(
      flatMap((uid: string) => {
        if (uid) {
          return this.getAllCertificationsFromOneTrainer(uid);
        }
        return null;
      })
    );
  }

  getCurrentTrainerCerts(): Observable<CertificationDTO[]> {
    return this.AS.CurrentUser$.pipe(
      flatMap((res: ICurrentUser) => {
        if (res) {
          return this.getAllCertificationsFromOneTrainer(res.uid);
        }
        return null;
      })
    );
  }
}
