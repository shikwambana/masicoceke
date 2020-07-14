import { Component, OnInit } from '@angular/core';

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
    { title: "Home", link: "/"},
    { title: "Order", link: "/order"},
    { title: "Contact us", link: "/contact"},
  ]

  sizes = [

    { view: "2kg (R40)", value: 2 },
    { view: "5kg (R100)", value: 5 }
  ]
  constructor() { }

  ngOnInit() {
  }

  addS(item){
    console.log(item)
  }

}
