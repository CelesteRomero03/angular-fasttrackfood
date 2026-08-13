import { Component } from '@angular/core';
import { NavbarAdmin } from '../../components/navbar-admin/navbar-admin';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarAdmin, RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {


menuAbierto = false;

constructor(private router:Router){
    this.router.events.subscribe(() => {

      // Eliminar cualquier backdrop de Bootstrap
      document.querySelectorAll('.modal-backdrop').forEach(element => {
        element.remove();
      });

      // Quitar estado de modal
      document.body.classList.remove('modal-open');

      // Restaurar scroll
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');

    });

}



toggleMenu(): void {
  this.menuAbierto = !this.menuAbierto;
}

cerrarMenu(): void {
  this.menuAbierto = false;
}



}
