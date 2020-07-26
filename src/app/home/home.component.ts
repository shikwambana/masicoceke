import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cannotTouch : boolean = true;
  order = {
    size: 5,
    quantity: 1,
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    dateOfDelivery: new Date(),
    time: "12:00",
    paid: false,
    dateOfPayment: new Date(),
    notes: ""
  }

  menuList = [
    { title: "Home", link: "/" },
    { title: "Order", link: "/order" },
    { title: "Contact us", link: "/contact" },
  ]

  sizes = [

    { view: "2kg R40", value: 2 },
    { view: "5kg R100", value: 5 }
  ]
  code;
  orderPlaced : boolean = false;
  loading : boolean = false;

  @ViewChild('verify', { static: true }) recapture: ViewContainerRef;
  
  constructor(private firebase: FirebaseService, private dialog : MatDialog) { }

  ngOnInit() {


    if(sessionStorage.getItem('data')){
      this.order = JSON.parse(sessionStorage.getItem('data'))

      this.order.dateOfDelivery = new Date();
      this.order.dateOfPayment = new Date();
    }


    navigator.geolocation.getCurrentPosition(res => {
      console.log(res)
    }, error =>{
      console.log(error)
    })
  }


  clearData(){
    this.order = {
      size: 5,
      quantity: 1,
      name: "",
      surname: "",
      address: "",
      phoneNumber: "",
      dateOfDelivery: new Date(),
      time: "12:00",
      paid: false,
      dateOfPayment: new Date(),
      notes: ""
    }
  }

  saveData(){
    sessionStorage.setItem('data',JSON.stringify(this.order))
  }

  addS(item) {
    console.log(item)
  }

  increment() {
    this.order['quantity']++;
    this.cannotTouch = false
  }

  decrement() {

    if (this.order['quantity'] !== 1) {
      this.order['quantity']--;
    }else{
      this.cannotTouch = true;
    }
  }

  registerUser(){

    let phone = this.order.phoneNumber;

    phone = '+27' + phone.substring(1,10)
    
    this.loading = true
    this.firebase.signIn(phone).then(res =>{
      this.loading = false
      console.log(res)
      // this.orderAndRegister()
    },err =>{
      console.log(err)
      this.loading = false;
    })

    // const dialogConfig = this.dialog.open(LoginComponent, {
    //   'width' : '300px',
    //   data: this.order
    // })
    
    // dialogConfig.afterClosed().subscribe(res =>{
    //   console.log(res)
    // })
  }

  orderAndRegister() {

    let user = {
      name: this.order.name,
      surname: this.order.surname,
      address: this.order.address,
      phoneNumber: this.order.phoneNumber,
      userID: this.createUUID()
    }

    this.firebase.addUser(user).then(res => {
      console.log(res)

      let order = {
        size: this.order.size,
        quantity: this.order.quantity,
        dateOfDelivery: this.order.dateOfDelivery,
        time: this.order.time,
        paid: false,
        dateOfPayment: this.order.dateOfPayment,
        notes: this.order.notes,
        phoneNumber: this.order.address,
        userID: user.userID
      }

      this.firebase.orderProduct(order).then(res => {
        console.log(res)
        this.firebase.inform('Order Placed. We will contact you in due time')

        this.order = {
          size: 5,
          quantity: 0,
          name: "",
          surname: "",
          address: "",
          phoneNumber: "",
          dateOfDelivery: new Date(),
          time: "12:00",
          paid: false,
          dateOfPayment: new Date(),
          notes: ""
        }
      })

    })

  }

  createUUID() {
    return 'xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  

}
