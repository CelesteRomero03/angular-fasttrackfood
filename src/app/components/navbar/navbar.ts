import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Carrito1 } from '../../services/carritoCompra/carrito1';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {





  constructor (public carrito1:Carrito1){}
}
