import { RouterLink } from '@angular/router';
import { Orders1 } from './../../services/orders1/orders';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export class OrderSuccess {


  orderNumber = '';
  qr = '';
  estimatedTime = '';


  constructor(private orders1: Orders1) { }



  ngOnInit() {
    this.orderNumber =
      localStorage.getItem('orderNumber') || '';


    this.estimatedTime =
      localStorage.getItem('estimatedTime') || '';

  }


  cargarQr() {
    this.orders1
      .getQrBase64(this.orderNumber)
      .subscribe((resp: any) => {

        this.qr = resp.qrCode;
      });
  }
}









