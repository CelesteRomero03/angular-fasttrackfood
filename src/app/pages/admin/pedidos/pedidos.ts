import { Component, OnInit } from '@angular/core';
import { Orders1 } from '../../../services/orders1/orders';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  pedidos: any[] = [];

  //para editar
  pedidoSeleccionado: any = null;

  modoEdicion: boolean = false;

  productos: any[] = [];


  // para crear nuevo pedido
  nuevoPedido: any = {
    customerName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryMode: 'take_away',
     deliveryAddress: '',
    items: [],
    total: 0
  };


  constructor(private order1: Orders1) { }




  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarProductos();

  }

  cargarProductos(): void {
    this.order1.getProducts().subscribe({
      next: (data: any) => {
        console.log("Productos:", data);
        this.productos = data;
      },
      error: (err) => {
        console.error('error cargando productos', err);
      }
    });
  }


  cargarPedidos(): void {
    this.order1.getOrders().subscribe({
      next: (data: any) => {
        this.pedidos = data;

        console.log(this.pedidos);

      },
      error: (err) => {
        console.error('error al cargar pedidos', err);
      },
    })
  }

  //metodo cambiar estado pedido
  cambiarEstado(pedido: any): void {

    let siguienteEstado: string | null = null;

    switch (pedido.status) {

      case 'pending':
        siguienteEstado = 'confirmed';
        break;

      case 'confirmed':
        siguienteEstado = 'preparing';
        break


      case 'preparing':
        siguienteEstado = 'ready';
        break;

      case 'ready':
        siguienteEstado = pedido.deliveryMode === 'delivery'
          ? 'out_for_delivery'
          : 'completed';
        break;

      case 'out_for_delivery':
        siguienteEstado = 'completed';
        break;

      default:
        alert('el pedido no puede cambiar de estado');
        return;
    }

    pedido.loading = true;//evita doble click

    this.order1.updateStatus(
      pedido.id,
      siguienteEstado,

    ).subscribe({
      next: () => {
        pedido.status = siguienteEstado;
        pedido.loading = false;
      },
      error: (err) => {
        console.error(err);
        pedido.loading = false;
        alert('error al cambiar el estado');
      }
    });
  }

  //carga detalle
  verPedido(id: number): void {
    this.order1.getOrderById(id).subscribe({
      next: (pedido: any) => {

        pedido.total = Number(pedido.total);

        this.pedidoSeleccionado = pedido;

        console.log(this.pedidoSeleccionado);
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar el pedido')
      }
    })
  }

  //cancelar pedido
  cancelarPedido(pedido: any): void {

    const motivoCancelacion = prompt('Ingrese el motivo de la cancelacion');

    if (!motivoCancelacion) {
      alert('Debe ingresar un motivo');
      return;
    }

    this.order1.cancelOrder(pedido.id, motivoCancelacion).subscribe({
      next: () => {
        pedido.status = 'cancelled';

        alert('Pedido cancelado correctamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al cancelar el pedido')
      }
    })
  }


  //metodo para editar
  habilitarEdicion(id: number): void {
    this.modoEdicion = true;

    this.order1.getOrderById(id).subscribe({
      next: (pedido: any) => {

        pedido.total = Number(pedido.total);

        this.pedidoSeleccionado = structuredClone(pedido);
      },
      error: (err) => {
        console.error(err);
        alert('error al cargar pedido');
      }
    });
  }



  //quitar 
  quitarProducto(index: number) {
    this.pedidoSeleccionado.items.splice(index, 1);
    this.calcularTotal();
  }



  //guardar edicion
  guardarEdicion(): void {

    if (this.pedidoSeleccionado.status !== 'pending') {
      alert('solo se puede editar pedidos pendientes');
      return;
    }


    // items que ya existen
    const itemsExistentes = this.pedidoSeleccionado.items
      .filter((item: any) => item.id)
      .map((item: any) => ({
        itemId: item.id,
        quantity: item.quantity
      }));


    // productos nuevos
    const itemsNuevos = this.pedidoSeleccionado.items
      .filter((item: any) => !item.id)
      .map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity
      }));



    console.log("Existentes:", itemsExistentes);
    console.log("Nuevos:", itemsNuevos);



    // primero actualizar cantidades
    if (itemsExistentes.length > 0) {

      this.order1.updateItems(
        this.pedidoSeleccionado.id,
        itemsExistentes
      )
        .subscribe({
          next: () => {
            console.log("cantidades actualizadas");


            this.agregarNuevosProductos(itemsNuevos);
          },
          error: (err) => {
            console.error(err)
          }
        });

    } else {
      this.agregarNuevosProductos(itemsNuevos)
    }

  }



  agregarNuevosProductos(itemsNuevos: any) {
    // luego agregar productos nuevos
    if (itemsNuevos.length > 0) {

      this.order1.addItems(
        this.pedidoSeleccionado.id,
        itemsNuevos
      )
        .subscribe({
          next: (res) => {
            console.log("productos agregados");

            alert('pedido Actualizado')

            this.modoEdicion = false;
            this.cargarPedidos();
          },
          error: (err) => {
            console.error(err);
            alert("error agregando productos");
          }
        });

    } else {

      alert("Pedido actualizado");
      this.modoEdicion = false;
      this.cargarPedidos();

    }

  }






  //agragar producto
  seleccionarProducto(productId: number) {

    const producto = this.productos.find(p => p.id == productId);
    if (!producto) return;

    const nuevoItem = {
      productId: producto.id,
      productName: producto.name,
      productDescription: producto.description,
      quantity: 1,
      unitPrice: Number(producto.price),
      subtotal: Number(producto.price)
    };

    this.pedidoSeleccionado.items = [
      ...this.pedidoSeleccionado.items,
      nuevoItem


    ];
    this.calcularTotal();
  }




  abrirCrearPedido() {
    this.nuevoPedido = {
      customerName: '',
      customerLastName: '',
      customerEmail: '',
      customerPhone: '',
      deliveryMode: 'take_away',
       deliveryAddress: '',
      items: [],
      total: 0
    };
  }


  crearPedido(): void {


  const pedidoEnviar = {

    customerName: this.nuevoPedido.customerName,

    customerLastName: this.nuevoPedido.customerLastName,

    customerEmail: this.nuevoPedido.customerEmail,

    customerPhone: this.nuevoPedido.customerPhone,

    deliveryMode: this.nuevoPedido.deliveryMode,

     deliveryAddress: this.nuevoPedido.deliveryAddress,


    items: this.nuevoPedido.items.map((item:any)=>({

      productId: item.productId,

      quantity: item.quantity

    }))

  };


  console.log("Pedido enviado:", pedidoEnviar);



  this.order1.createOrder(pedidoEnviar)
  .subscribe({

    next:(res:any)=>{

      console.log("Pedido creado:",res);

      alert("Pedido creado correctamente");

      this.cargarPedidos();

      this.abrirCrearPedido();

    },


    error:(err:any)=>{

      console.error("Error creando pedido:",err.error);

    }

  });


}




  seleccionarProductoNuevo(productId: number) {

    const producto = this.productos.find(
      p => p.id == productId
    );

    if (!producto) return;


    const itemExistente = this.nuevoPedido.items.find(
      (item: any) => item.productId == productId
    );


    // si ya existe aumenta cantidad
    if (itemExistente) {

      itemExistente.quantity++;

      itemExistente.subtotal =
        itemExistente.quantity * itemExistente.unitPrice;

    } else {


      const nuevoItem = {

        productId: producto.id,

        productName: producto.name,

        quantity: 1,

        unitPrice: Number(producto.price),

        subtotal: Number(producto.price)

      };


      this.nuevoPedido.items.push(nuevoItem);

    }


    this.calcularTotalNuevo();

  }

  //para el calcular el total del nuevo pedido
  calcularTotalNuevo() {

    this.nuevoPedido.total =
      this.nuevoPedido.items.reduce(

        (total: number, item: any) =>
          total + Number(item.subtotal)

        , 0);


  }





  calcularTotal() {

    this.pedidoSeleccionado.total =
      this.pedidoSeleccionado.items.reduce(

        (total: any, item: any) =>

          total + Number(item.subtotal)

        , 0);

  }

  calcularSubtotal(item: any) {

    item.subtotal =
      Number(item.quantity) * Number(item.unitPrice);

    this.calcularTotal();

  }

}
