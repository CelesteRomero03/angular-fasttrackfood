import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Products1 {

  private apiUrl = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }



  //devuelve todos los productos(admin)
  getProducts() {
    return this.http.get(this.apiUrl);
  }


  //sistema publico(muestra los productos activos)
  getAvailableProducts() {
    return this.http.get(`${this.apiUrl}/available`);
  }



  //agrego metodo guardar producto

  createProduct(producto: any) {
    return this.http.post(this.apiUrl, producto);
  }



  //editar
  updateProduct(id: number, producto: any) {
    return this.http.patch(

      `${this.apiUrl}/${id}`,
      producto
    )
  }

  //eliminar

  deleteProduct(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  //metodo para activar

  toggleAvailability(id: number) {
    return this.http.patch(

      `${this.apiUrl}/${id}/toggle-availability`,
      {}
    )
  }





}
