import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Orders1 {


  private apiUrl = 'http://localhost:3000/orders';


  private productsUrl = 'http://localhost:3000/products';

  getProducts() {
    return this.http.get(this.productsUrl, this.getHeaders());
  }

  constructor(private http: HttpClient) { }


  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  //crea pedido desde administracion
  createOrder(pedido: any) {

    return this.http.post(
      `${this.apiUrl}`,
      pedido,
      this.getHeaders()
    );

  }

  crearOrder(order: any) {
    return this.http.post(this.apiUrl, order, this.getHeaders());
  }


  getQrBase64(orderNumber: string) {
    return this.http.get(
      `http://localhost:3000/orders/${orderNumber}/qr-base64`
    )
  }


  //seguimiento
  getOrderByNumber(orderNumber: string) {
    return this.http.get(
      `${this.apiUrl}/track/${orderNumber}`,

    )
  }

  //lista pedidos
  getOrders() {

    return this.http.get(this.apiUrl, this.getHeaders());

  }



  getOrderById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  //cambiar estado del pedido

  updateStatus(id: number, status: string) {
    return this.http.patch(`${this.apiUrl}/${id}/status`, {
      status,

    },
      this.getHeaders()
    );
  }


  //cancelar pedido
  cancelOrder(id: number, reason: string) {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {
      reason,
    },
      this.getHeaders()
    );
  }


  //agregar producto

  addItems(id: number, items: any[]) {
    return this.http.post(`${this.apiUrl}/${id}/items`, {
      items,
    },
      this.getHeaders()
    )
  }


  //modificar pedido
  updateItems(id: number, items: any[]) {
    return this.http.patch(`${this.apiUrl}/${id}/items`, {
      items,
    },
      this.getHeaders()
    )
  }


  //eliminar producto del pedido

  removeItem(orderId: number, itemId: number) {
    return this.http.delete(
      `${this.apiUrl}/${orderId}/items/${itemId}`, this.getHeaders()
    );
  }


}
