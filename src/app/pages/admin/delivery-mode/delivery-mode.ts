import { Component } from '@angular/core';
import { DeliveryModes } from '../../../services/delivery-mode/delivery-modes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delivery-mode',
  imports: [],
  templateUrl: './delivery-mode.html',
  styleUrl: './delivery-mode.css',
})
export class DeliveryMode {

  modos: any[] = [];

  constructor(private deliveryMode: DeliveryModes) { }


  ngOnInit() {
    this.obtenerModos();
  }


  obtenerModos() {

    this.deliveryMode.getModes()
      .subscribe({
        next: (resp: any) => {

          console.log(resp);

          this.modos = resp;

        },

        error: (err) => {

          console.log(err);

        }
      })

  }

  cambiarEstado(modo: any) {

    const request = modo.isActive
      ? this.deliveryMode.deactivate(modo.id)
      : this.deliveryMode.activate(modo.id);



    request.subscribe({

      next: () => {

        this.obtenerModos();

      },


      error: (err) => {

        console.log(err);

      }

    });


  }
}








