import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatSelectModule, MatIconModule, MatSnackBarModule, MatPaginatorModule, MatCheckboxModule, MatDialogModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    ContactComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxMaterialTimepickerModule
  ],
  providers: [MatDatepickerModule,AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents : [LoginComponent]
})
export class AppModule { }
