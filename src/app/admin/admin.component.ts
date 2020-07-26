import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from "../services/firebase.service";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['size', 'dateOfDelivery', 'address', 'phoneNumber', 'dateOfPayment', 'paid'];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products: Array<Object> = [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllProducts() {
    let that = this
    this.firebase.fetchProducts().then(querysnapshot => {
      querysnapshot.forEach(function (doc) {
        let item = doc.data()

        if (item['dateOfDelivery'].seconds) {
          item['dateOfDelivery'] = item['dateOfDelivery'].toDate()
        }
        if (item['dateOfPayment'].seconds) {
          item['dateOfPayment'] = item['dateOfPayment'].toDate()
        }

        that.products.push(item)
        console.log(that.products)
      })
    }).then(res => {
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;

    })

  }

}
