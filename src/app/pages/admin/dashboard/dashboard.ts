import { Component } from '@angular/core';
import { Products1 } from '../../../services/products1/products1';
import { Categories1 } from '../../../services/category1/categories';

import { Orders1 } from '../../../services/orders1/orders';
import { Users1 } from '../../../services/user1/users';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  totalProductos = 0;

  totalCategorias = 0;

  totalPedidos = 0;

  totalUsuarios = 0;

  constructor(private products1: Products1,
    private category1: Categories1,
    private orders1: Orders1,
    private user1: Users1,
  ) { }

  usuario = JSON.parse(
    localStorage.getItem('user') || '{}'
  );


  //obtener los datos
  ngOnInit() {


    this.products1.getProducts().subscribe((resp: any) => {
      this.totalProductos = resp.length;
    });

    this.category1.getCategories().subscribe((resp: any) => {
      this.totalCategorias = resp.length;
    });

    this.orders1.getOrders().subscribe((resp: any) => {
      this.totalPedidos = resp.length;
    });

    this.user1.getUsers().subscribe((resp: any) => {
      this.totalUsuarios = resp.length;
    });





  }

}
