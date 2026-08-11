import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { filter } from 'rxjs';
import { NavbarAdmin } from './components/navbar-admin/navbar-admin';
import { Spinner } from './shared/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('food-service-frontend');


  esAdmin = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.esAdmin =
          this.router.url.startsWith('/admin');
      });
  }



}
