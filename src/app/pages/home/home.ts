
import { Carrito1 } from '../../services/carritoCompra/carrito1';
import { Products1 } from '../../services/products1/products1';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Categories1 } from '../../services/category1/categories';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  products: any[] = [];
  categorias: any[] = []
  textBusqueda = '';

  productosOriginales: any[] = [];
  productosFiltrados: any[] = [];


  constructor(private products1: Products1, private carrito1: Carrito1, private categories1: Categories1) { }

  //cargar
  ngOnInit(): void {

    this.products1.getAvailableProducts()
      .subscribe({

        next: (data: any) => {

          //luego borrar
          console.log('PRODUCTOS BACKEND', data);

          this.products = data;

          this.productosOriginales = data;

          this.productosFiltrados = data;

        },

        error: (err) => {

          console.error('ERROR', err);

        }

      });

    this.categories1.getActiveCategories()
      .subscribe({
        next: (data: any) => {

          this.categorias = data;

          console.log("CATEGORIAS ACTIVAS", data);

        },

        error: (err) => {
          console.log(err);
        }
      });

  }

  addToCart(product: any) {
    this.carrito1.agregarCant(product);
  }


  //filtro por busqueda
  filtrarProductos() {

    this.productosFiltrados =
      this.productosOriginales.filter(product =>
        product.name
          .toLowerCase()
          .includes(
            this.textBusqueda.toLocaleLowerCase()
          )
      )
  }


  //filtro por categoria


  filtrarCategoria(categoria: string) {

    if (categoria === 'Todas') {

      this.productosFiltrados =
        this.productosOriginales.filter(product => product.category?.isActive);

      return;
    }


    this.productosFiltrados =
      this.productosOriginales.filter(product =>
        product.category?.name === categoria &&
        product.category?.isActive
      );

  }


}
