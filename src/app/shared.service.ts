import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private fs: Firestore) {}

  getServices() {
    const servicesCollection = collection(this.fs, 'services');
    return collectionData(servicesCollection, { idField: 'id' });
  }

  addService(service: any) {
    const data = service;
    const servicesCollection = collection(this.fs, 'services')
    return addDoc(servicesCollection, service);
  }

  deleteService(id: string) {
    const docRef = doc(this.fs, 'services/' + id);
    return deleteDoc(docRef)
  }
}
