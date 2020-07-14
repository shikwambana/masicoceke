import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  orderProduct(product) {
    return this.firestore.collection('washingPowder').add(product);
  }

  addUser(user){
    return this.firestore.collection('users').add(user);
  }
}
