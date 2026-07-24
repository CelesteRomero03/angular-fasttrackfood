import { Component } from '@angular/core';
import { Users1 } from '../../../services/user1/users';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

  usuarios: any[] = []

  usuarioForm: FormGroup;

  usuarioSeleccionado:any = null;

  constructor(private user1: Users1, private fb: FormBuilder) {

    this.usuarioForm = this.fb.group({

      name: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: [''],

      role: ['employee', Validators.required]
    });
  }


  ngOnInit() {
    this.obtenerUsuarios()
  }


  obtenerUsuarios() {
    this.user1.getUsers().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.usuarios = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  nuevoUsuario(){

    this.usuarioSeleccionado = null;

    this.usuarioForm.reset({
      role:'employee'
    })
  }


  //metodo guardar usuario
  guardarUsuario() {

    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.user1.createUser(this.usuarioForm.value)
      .subscribe({

        next: (resp: any) => {
          console.log('usuario creado', resp);


          //recarga tabla
          this.obtenerUsuarios();


          //limpia formulario
          this.usuarioForm.reset({
            role: 'employee'
          });
        },

        error: (err) => {
          console.log(err);
        }
      })
  }


  eliminarUsuario(id:number){

    const confirmar = confirm(
      '¿seguro deseas eliminar este usuario?'
    )

    if(!confirmar){
      return;
    }


    this.user1.deleteUser(id)
      .subscribe({

        next:(resp:any) =>{

          console.log('usuario eliminado',resp);

          this.obtenerUsuarios();
        },

        error:(err) => {
          console.log(err)
        }
      })

  }


  editarUsuario(usuario:any){

    this.usuarioSeleccionado = usuario;

    this.usuarioForm.patchValue({

      name:usuario.name,

      lastName:usuario.lastName,

      email:usuario.email,

      

      role:usuario.role
    });

  }

  actualizarUsuario(){

    if(this.usuarioForm.invalid){
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.user1.updateUser(
      this.usuarioSeleccionado.id,
      this.usuarioForm.value
    )
    .subscribe({
      next: (resp: any) => {

        console.log('Usuario actualizado', resp);

        this.obtenerUsuarios();

        this.usuarioForm.reset({
          role:'employee'
        });

        //quita modo edcion
        this.usuarioSeleccionado = null;
      },

      error: (err) => {

        console.log(err);

      }
    })
  }


  cambiarEstado(usuario: any) {

    const request = usuario.isActive
      ? this.user1.desactivateUser(usuario.id)
      : this.user1.activateUser(usuario.id);


    request.subscribe({

      next: (resp: any) => {

        console.log('Estado actualizado', resp);

        this.obtenerUsuarios();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }


  reenviarEmail(id:number){

    this.user1.resendEmail(id)
    .subscribe({
      next:(resp:any) =>{

        console.log('Email reenviado',resp);


      },

      error:(err) => {
        console.log(err);
      }
    })
  }






}
