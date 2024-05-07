import { Component, EventEmitter, Output } from '@angular/core';

import { Usuario } from '../_model/usuario';

import { HttpClient } from '@angular/common/http';

import { urlApiRegistroUsuario } from '../_helper/urls';

import { faBuilding, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import { faGlobe, faKey, faLocationArrow, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { SwalMessages } from '../../commons/_dto/swal-message';

declare var $: any;

@Component({

  selector: 'app-register',

  templateUrl: './register.component.html',

  styleUrl: './register.component.css'

})

export class RegisterComponent {

  urlRegistro: string = urlApiRegistroUsuario;

  usuario: Usuario = new Usuario();

  userIcon = faUser;

  surnameIcon = faUserPlus;

  addressIcon = faLocationArrow;

  mailIcon = faEnvelope;

  usernameIcon = faUserSecret;

  passwordIcon = faKey;

  regionIcon = faGlobe;

  rfcIcon = faBuilding;

  constructor(private http: HttpClient, private router: Router) { }

  @Output() registerEvent = new EventEmitter<boolean>();

  swal: SwalMessages = new SwalMessages(); // swal messages

  onSubmit() {

    console.log(this.usuario);



    this.http.post(this.urlRegistro, this.usuario, { observe: 'body' }).subscribe(

      (response) => {

        console.log(JSON.stringify(response));

        Swal.fire(

          {

            title: 'Usuario registrado',

            text: 'Usuario Registrado exitosamente',

            icon: 'success',

            showConfirmButton: true,



          }

        ).then((result) => {

          if (result.isConfirmed) {

            this.registerEvent.emit(true);

          }

        })

      },

      (e) => {
        

        this.swal.errorMessage(e.error!.message);

      },

      () => {

        console.log('Bloque de codigo que se ejecuta siempre. Sin importar si se ejecuto con exito o con error');

      }

    )

  }

  showLoginModal(){
    this.registerEvent.emit(true);
    $("#loginModal").modal("show");

  }

}