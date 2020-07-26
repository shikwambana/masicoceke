import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HomeComponent } from "../home/home.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  code : string = '';
  constructor(private firebase: FirebaseService, private dialog : MatDialog, public dialogRef : MatDialogRef<HomeComponent>) { }

  ngOnInit() {

  }

  verify(){
    this.firebase.confirmationCode = this.code
    this.dialogRef.close(this.code)
  }

}
