import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Users1 {



  api = 'https://nest-fast-track-food.onrender.com/users';


  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get(this.api);

  }


  createUser(user: any) {
    return this.http.post(this.api, user);
  }

  updateUser(id: number, user: any) {
    return this.http.patch(`${this.api}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }


  activateUser(id: number) {
    return this.http.patch(`${this.api}/${id}/activate`, {});
  }

  desactivateUser(id: number) {
    return this.http.patch(`${this.api}/${id}/deactivate`, {});
  }

  resendEmail(id: number) {
    return this.http.post(`${this.api}/${id}/resend-email`, {});
  }


}
