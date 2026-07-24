import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrito1 } from '../../services/carritoCompra/carrito1';
import { Orders1 } from '../../services/orders1/orders';
import { Router } from '@angular/router';
import { DeliveryModes } from '../../services/delivery-mode/delivery-modes';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  pedidoForm: FormGroup;


  paso = 1;

  enviando = false;


  modosEntrega: any[] = [];

  constructor(private fb: FormBuilder,
    private carrito1: Carrito1,
    private orders1: Orders1,
    private router: Router,
    private deliveryMode: DeliveryModes) {


    this.pedidoForm = this.fb.group({
      clientName: ['', Validators.required],
      clientLastName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ],
      deliveryMode: ['delivery', Validators.required],
      deliveryAddress: [''],
      notes: ['']

    });
  }


  carrito: any[] = [];

  ngOnInit() {
    this.carrito = this.carrito1.getItems();
    this.obtenerModosEntrega();
  }


  siguientePaso() {

    if (this.pedidoForm.get('clientName')?.invalid ||
      this.pedidoForm.get('clientLastName')?.invalid
    ) {
      return;
    }

    this.paso = 2;
  }

  siguientePaso2() {
    this.paso = 3;
  }



  volverPaso() {
    this.paso = 1;
  }

  volverPaso2() {
    this.paso = 2;
  }

  get total() {
    return this.carrito1.totalCarrito();
  }



  confirmarPedido() {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    if (this.enviando) {
      return;
    }

    this.enviando = true;

    const pedido = {

      deliveryMode:
        this.pedidoForm.value.deliveryMode,

      customerName:
        this.pedidoForm.value.clientName,

      customerLastName:
        this.pedidoForm.value.clientLastName,

      customerEmail:
        this.pedidoForm.value.clientEmail,

      customerPhone:
        this.pedidoForm.value.clientPhone,

      deliveryAddress:
        this.pedidoForm.value.deliveryAddress,

      notes:
        this.pedidoForm.value.notes,

      items:
        this.carrito1.getItems().map(item => ({
          productId: item.id,
          quantity: item.quantify
        }))

    };

    console.log('Pedido a enviar:', pedido);

    this.orders1.crearOrder(pedido)
      .subscribe({

        next: (resp: any) => {
          console.log('Pedido Creado', resp);


          localStorage.setItem(
            'orderNumber',
            resp.orderNumber
          );

          localStorage.setItem(
            'estimatedTime',
            resp.estimatedDeliveryTime
          );


          this.carrito1.clearCart();

          this.router.navigate([
            '/pedido-confirmado'
          ]);
        },
        error: (err) => {

          console.error('Error al crear pedido', err);

          this.enviando = false;

        }

      });
  }


  obtenerModosEntrega() {

    this.deliveryMode.getModes()
      .subscribe({

        next: (resp: any) => {

          this.modosEntrega = resp.filter(
            (modo: any) => modo.isActive
          );

        },

        error: (err) => {

          console.log(err);

        }

      });

  }












}