import { Component } from '@angular/core';
import { NavbarAdmin } from '../../components/navbar-admin/navbar-admin';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarAdmin, RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {


menuAbierto = false;

toggleMenu(): void {
  this.menuAbierto = !this.menuAbierto;
}

cerrarMenu(): void {
  this.menuAbierto = false;
}



}
