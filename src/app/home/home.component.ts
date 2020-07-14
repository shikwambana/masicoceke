import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  order = {
    size: "",
    quantity: "",
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    dateOfDelivery: "",
    time: "",
    paid: false,
    dateOfPayment: "",
    notes: ""
  }

  menuList = [
    { title: "Home", link: "/" },
    { title: "Order", link: "/order" },
    { title: "Contact us", link: "/contact" },
  ]

  sizes = [

    { view: "2kg (R40)", value: 2 },
    { view: "5kg (R100)", value: 5 }
  ]
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    console.log(this.createUUID())
  }


  addS(item) {
    console.log(item)
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

      this.firebase.orderProduct(order).then(res =>{
        console.log(res)
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
