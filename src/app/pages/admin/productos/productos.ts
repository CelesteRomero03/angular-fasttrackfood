
import { Component } from '@angular/core';
import { Products1 } from '../../../services/products1/products1';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories1 } from '../../../services/category1/categories';

@Component({
  selector: 'app-productos',
  imports: [ReactiveFormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  //variables

  productos: any[] = []

  categorias: any[] = [];

  productoEditando: any = null;

  productoAEliminar: any = null;


  //Formulario
  productoForm: FormGroup;

  constructor(private products1: Products1,
    private fb: FormBuilder,
    private categories1: Categories1
  ) {



    this.productoForm = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      price: ['', Validators.required],

      stock: ['', Validators.required],

      imageUrl: [''],

      categoryId: ['', Validators.required]

    });
  }


  ngOnInit() {

    this.obtenerProductos();

    this.categories1.getCategories()
      .subscribe((resp: any) => {

        this.categorias = resp;
      });
  }



  guardarProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();

      return;
    }

    this.products1.createProduct(this.productoForm.value)
      .subscribe({

        next: (resp: any) => {
          console.log('Producto Creado', resp);


          //agrego producto a la tabla
          this.obtenerProductos();

          //limpio formulario
          this.productoForm.reset();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }



  editarProducto(product: any) {

    this.productoEditando = product;
    this.productoForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId
    });
  }


  actualizarProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }
    this.products1.updateProduct(
      this.productoEditando.id,

      this.productoForm.value
    ).subscribe({
      next: (resp: any) => {

        console.log('producto Actualizado', resp);

        //recarga tabla
        this.obtenerProductos();

        //limpiar form
        this.productoForm.reset();

        //salir edicion

        this.productoEditando = null;
      },

      error: (err) => {
        console.log(err);
      }

    });
  }


  obtenerProductos() {

    this.products1.getProducts()
      .subscribe((resp: any) => {


        console.log(resp);

        this.productos = resp;
      });
  }


  eliminarProducto() {


    this.products1.deleteProduct(
      this.productoAEliminar.id
    )
      .subscribe({

        next: () => {
          console.log('Producto eliminado');

          this.obtenerProductos();

          this.productoAEliminar = null;
        },

        error: (err) => {
          console.log(err);
        }

      });
  }


  //metodo abrir modal

  seleccionarProdEliminar(product: any) {
    this.productoAEliminar = product;
  }



  cambiarEstado(product: any) {


    this.products1.toggleAvailability(product.id)

      .subscribe({

        next: (resp) => {
          console.log('RESPUESTA', resp);
          this.obtenerProductos();
        },

        error: (err) => {
          console.log(err);
        }
      })
  }























  imagenes = [
    '/imagenComidas/pizzaVegieCalabaza.jpg',
    '/imagenComidas/pizzaSardinas.avif',
    '/imagenComidas/miniPizzasVegie.jpg',
    '/imagenComidas/hamburPollo.webp',
    '/imagenComidas/hamburLenteja.jpg',

    '/imagenComidas/hamburGuacamole.jpg',

    '/imagenComidas/hamburGarbanzo.jpg',

    '/imagenComidas/hamburBlack.webp',
    '/imagenComidas/hamburBconXL.jpg',
    '/imagenComidas/empaVegetariana.jpg',
    '/imagenComidas/empaAtun.jpg',
    '/imagenComidas/conoPizza.avif',


  ]

}
