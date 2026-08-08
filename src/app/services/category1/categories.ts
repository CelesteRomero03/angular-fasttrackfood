import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categories1 {



  api = 'https://nest-fast-track-food.onrender.com/categories';



  constructor(private http: HttpClient) { }



  //obtengo todas las categorias
  getCategories() {
    return this.http.get(this.api);
  }

  //agrego metodo crear categoria

  createCategory(category: any) {
    return this.http.post(this.api, category);
  }



  //editar
  updateCategory(id: number, category: any) {
    return this.http.patch(

      `${this.api}/${id}`,
      category
    )
  }

  //eliminar

  deleteCategory(id: number) {
    return this.http.delete(
      `${this.api}/${id}`
    );
  }

  //metodo para activar y desactivar
  deactivateCategory(id: number) {
    return this.http.patch(
      `${this.api}/${id}/deactivate`,
      {}
    );
  }

  
  
  activateCategory(id: number) {

    return this.http.patch(
      `${this.api}/${id}/activate`,
      {}
    );

  }



//obtengo las categorias activas
  getActiveCategories() {

    return this.http.get(
      `${this.api}/active`
    );

  }



}
