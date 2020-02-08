import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { Globals } from '../model/Globals';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  usuario: Usuario;

  constructor(public router: Router, public srv: UsuarioService) { }

  ngOnInit() {

    if(localStorage.getItem("MyToken")){
        

      this.srv.buscarInfo(localStorage.getItem("MyToken")).subscribe(
        (res: Usuario) => {
          
              Globals.user = res;
              this.usuario = new Usuario();
              this.usuario.nome = res.nome;
              this.usuario.idUsuario = res.idUsuario;
              this.usuario.nomeFantasia = res.nomeFantasia;
        },   
      err => {
        console.log(err);
        alert("Erro ao inserir");
      });
    
  }else{     
    this.router.navigate(['/home']);
    alert("Você Precisa estar conectado para acessar essa página!")
    console.log(localStorage.getItem);
  }
  }

  public logout(){
    if(localStorage.getItem("MyToken")){
      localStorage.removeItem("MyToken");
      this.router.navigate(['/home']);
    }else{
    this.router.navigate(['/home']);
    }
  }

}
