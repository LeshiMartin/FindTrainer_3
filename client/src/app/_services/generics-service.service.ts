import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GenericsServiceService {
  constructor(private afStore: AngularFirestore) {}
  addDoc(data: any, collectionName: string): Promise<DocumentReference> {
    return this.afStore.collection(collectionName).add(data);
  }
  deleteDoc(uid: string, collectionName: string): Promise<void> {
    return this.afStore.collection(collectionName).doc(uid).delete();
  }
  updateDoc(uid: string, collectionName: string, data: any): Promise<void> {
    return this.afStore.collection(collectionName).doc(uid).set(data);
  }
}
