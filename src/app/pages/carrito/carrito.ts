import { Component } from '@angular/core';
import { Carrito1 } from '../../services/carritoCompra/carrito1';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {


  //inyectamos para usar los metodos del servicio
  constructor(private carrito1: Carrito1) { }

  carrito: any[] = [];

  ngOnInit() {
    this.carrito = this.carrito1.getItems();

    console.log('Items carrito:', this.carrito);
  }


  aumentar(id: number) {
    this.carrito1.incrementoCantidad(id)
  }

  disminuir(id: number) {
    this.carrito1.disminuirCantidad(id)
  }


  eliminar(id: number) {
    this.carrito1.removeItem(id);
    this.carrito = this.carrito1.getItems()
  }


  get total() {
    return this.carrito1.totalCarrito()
  }




}
