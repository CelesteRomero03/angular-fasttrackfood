import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth1 {


  api = 'https://nest-fast-track-food.onrender.com/auth';

  constructor( private http:HttpClient){}


  login(data:any){
    return this.http.post(
      `${this.api}/login`,
      data
    );
  }
}
