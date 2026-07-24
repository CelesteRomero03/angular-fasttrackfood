
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories1 } from '../../../services/category1/categories';

@Component({
  selector: 'app-categorias',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {



  //variables

  categorias: any[] = [];

  categoriaEditando: any = null;

  categoriaAEliminar: any = null;

  //Formulario
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categories1: Categories1
  ) {



    this.categoriaForm = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],



    });
  }


  ngOnInit() {

    this.obtenerCategorias();


  }

  obtenerCategorias() {
    this.categories1.getCategories()
      .subscribe((resp: any) => {
        this.categorias = resp;
      });
  }


  guardarCategoria() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();

      return;
    }

    this.categories1.createCategory(this.categoriaForm.value)
      .subscribe({

        next: (resp: any) => {
          console.log('Categoria Creado', resp);


          //agrego categoria a la tabla
          this.obtenerCategorias();

          //limpio formulario
          this.categoriaForm.reset();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }



  editarCategoria(category: any) {

    this.categoriaEditando = category;
    this.categoriaForm.patchValue({
      name: category.name,
      description: category.description,

    });
  }


  actualizarCategoria() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    this.categories1.updateCategory(
      this.categoriaEditando.id,
      this.categoriaForm.value

    ).subscribe({
      next: (resp: any) => {

        console.log('producto Actualizado', resp);

        //recarga tabla
        this.obtenerCategorias();

        //limpiar form
        this.categoriaForm.reset();

        //salir edicion

        this.categoriaEditando = null;
      },

      error: (err) => {
        console.log(err);
      }

    });
  }


  eliminarCategoria() {


    this.categories1.deleteCategory(
      this.categoriaAEliminar.id
    )
      .subscribe({

        next: () => {
          console.log('Producto eliminado');

          this.obtenerCategorias();

          this.categoriaAEliminar = null;
        },

        error: (err) => {
          console.log(err);
        }

      });
  }


  //metodo abrir modal
  seleccionarCatEliminar(category: any) {
    this.categoriaAEliminar = category;
  }


  //activado o desactivado
  cambiarEstado(category: any) {


    const request = category.isActive
      ? this.categories1.deactivateCategory(category.id)
      : this.categories1.activateCategory(category.id);

    request.subscribe({

      next: () => {
        this.obtenerCategorias();
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

}
