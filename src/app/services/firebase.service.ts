import { Injectable, ViewChild, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as firebase from "firebase";
import { error } from 'protractor';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginComponent } from '../login/login.component';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collection = this.firestore.collection('washingPowder');
  products: [] = [];
  @ViewChild('signin', { static: true }) verify;
  @ViewChild('code', { static: true }) code;
  confirmationCode;

  constructor(private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private route : Router,
    private dialog: MatDialog) { }

  orderProduct(product) {
    return this.collection.add(product);
  }

  addUser(user) {
    return this.firestore.collection('users').add(user);
  }

  fetchProducts() {
    return this.collection.get().toPromise().then(function (querysnapshot) {
      return querysnapshot
    })
  }

  signIn(number) {

    firebase.auth().useDeviceLanguage();

    return this.auth.signInWithPhoneNumber(number, this.firebaseRecapture()).then(res => {

      const dialogConfig = this.dialog.open(LoginComponent, {
        'width': '300px'
      })

      dialogConfig.afterClosed().subscribe(response => {

        return res.confirm(response).then(answer => {
          console.log('user verified',answer)
          this.route.navigate(['/order']);
        }).catch(error => {
          console.log(error)
        })

      })

    }).catch(function (error) {
      // Error; SMS not sent
      console.log(error)
    });

  }

  firebaseRecapture() {

    return this.verify = new firebase.auth.RecaptchaVerifier('signin', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
        console.log(response)
        return response['verificationId']
      }
    });

  }

  inform(message) {

    this.snackbar.open(message, 'close', {
      duration: 4000
    })
  }

}
