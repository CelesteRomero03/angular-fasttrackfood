import { FormsModule } from '@angular/forms';
import { Orders1 } from './../../services/orders1/orders';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  imports: [FormsModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento {



constructor(private orders1:Orders1){}

  orderNumber = '';


  pedido:any = null;


  buscarPedido(){

    this.orders1.getOrderByNumber(this.orderNumber)
      .subscribe({

        next:(resp:any)=>{
          this.pedido = resp;
        },

        error:() => {
          alert('pedido no encontrado')
        }
      });

  }
}
