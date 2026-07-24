import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryModes {



  private apiUrl = 'http://localhost:3000/delivery-mode';


  constructor(private http: HttpClient) { }

  getModes() {
    return this.http.get(this.apiUrl);
  }

  activate(id: number) {
    return this.http.patch(
      `${this.apiUrl}/${id}/activate`,
      {}
    );
  }


  deactivate(id: number) {
    return this.http.patch(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );




  }
}