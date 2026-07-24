import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Carrito1 {


  private carrito: any[] = [];

  constructor() { }

  //devuelve productos del carrito
  getItems() {
    return this.carrito;
  }
  

  //Agrega producto al carrito 
  agregarCant(product: any) {
    const existe = this.carrito.find(
      item => item.id === product.id
    );

    if(existe){
      existe.quantify++;
    } else{
      this.carrito.push({
        ...product,
        quantify: 1
      });

    }
     console.log(this.carrito);
  }


  //aumentar cantidad 

  incrementoCantidad(id:number){
    const item = this.carrito.find(
      p => p.id === id
    );
    if(item){
      item.quantify++;
    }
  }



  //disminuir

  disminuirCantidad(id: number){
    const item = this.carrito.find(
      p => p.id === id
    );
    if(item && item.quantify > 1){
      item.quantify--;
    }
  }


  //total carrito

  totalCarrito(){
    return this.carrito.reduce(
      (total,item) =>
        total + item.price * item.quantify,
      0
    );
  }

  removeItem(id: number) {
    this.carrito = this.carrito.filter(
      item => item.id !== id
    );
  }

  
  clearCart() {
    this.carrito = [];
  }



  //metodo muestra cantidad de productos en el carrito
  cantidadProductos():number{
    return this.carrito.reduce(
      (total,item) => total + item.quantify,0
    );
  }




}
