import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  imports: [RouterLink],
  templateUrl: './navbar-admin.html',
  styleUrl: './navbar-admin.css',
})
export class NavbarAdmin {



  usuario: any = {};

 
mostrarMenuUsuario = false;



  @Output() menuToggle = new EventEmitter<void>();



  ngOnInit(): void {
    const user = localStorage.getItem('user');


    if (user) {
      this.usuario = JSON.parse(user)
    }
  }


  


cerrarSesion(): void {

  // Por ahora cerramos el menú
  this.mostrarMenuUsuario = false;

  // Acá después podemos agregar el logout real
}









}
