import { Component, OnInit } from '@angular/core';
import { InfoUsuario } from '../model/InfoUsuario';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';

@Component({
  selector: 'app-pessoajuridica',
  templateUrl: './pessoajuridica.component.html',
  styleUrls: ['./pessoajuridica.component.css']
})
export class PessoajuridicaComponent implements OnInit {

  public infousuario: InfoUsuario;
  usuario: Usuario;
  public cnpj: string;
  public nomeFantasia: string;
  public razaoSocial: string;
  public telefone: string;
  public senha: string;
  public endereco: string;
  public setor: string;
  public infoEmpresa: string;
  public infoVagas: string;

  constructor(public srv: UsuarioService, public router: Router) { }

  ngOnInit() {
  

  if(localStorage.getItem("MyToken")){

    this.srv.buscarInfo(localStorage.getItem("MyToken")).subscribe(
      (res: Usuario) => {
        
            Globals.user = res;
            this.usuario = new Usuario();
            this.usuario.nome = res.nome;
            this.usuario.idUsuario = res.idUsuario;
            this.recuperaInformacoesInfo();
            this.recuperaInformacoesUser();
      },   
    err => {
      alert("Erro ao inserir");
    });
  
}else{
  alert("Você Precisa estar conectado para acessar essa página!")
  this.router.navigate(['/home']);
}

}

public enviar(){

  this.srv.recuperaInfoUsuario(this.usuario.idUsuario).subscribe(
    (res:InfoUsuario)=>{
      this.infousuario = res;
      this.alterarInfo();
    },
    err=>{
      this.inserir();
    }
  )

}


public alterarInfo(){

  this.infousuario.idInfo = this.usuario.idUsuario;
  this.usuario.cnpj = this.cnpj;
  this.usuario.nomeFantasia = this.nomeFantasia;
  this.usuario.razaoSocial = this.razaoSocial;
  this.usuario.telefone = this.telefone;
  this.usuario.senha = this.senha;
  this.infousuario.endereco = this.endereco;
  this.infousuario.setor = this.setor;
  this.infousuario.infoEmpresa = this.infoEmpresa;
  this.infousuario.infoVagas = this.infoVagas;

  console.log("entrou no alterarinfo");
  this.srv.alteraInfoUsuario(this.infousuario).subscribe(
    (res:InfoUsuario)=>{
      this.infousuario = res;
      alert("Alterado com sucesso!");
      this.router.navigate(['/perfilpessoajuridica']);
      console.log(this.infousuario);
    },
    err=>{
      alert("Erro ao alterar!");
    }
  )

}

public recuperaInformacoesInfo(){

  this.srv.recuperaInfoUsuario(this.usuario.idUsuario).subscribe(
    (res:InfoUsuario)=>{
      this.infousuario = res;
    },
    err=>{
      
    }
  )

}

public recuperaInformacoesUser(){

  this.srv.recuperaUsuario(this.usuario.idUsuario).subscribe(
    (res:Usuario)=>{
      this.usuario = res;
      this.usuario.telefone = res.telefone;
    },
    err=>{
      
    }
  )

}


public inserir(){

  this.infousuario = new InfoUsuario();

  this.infousuario.idInfo = this.usuario.idUsuario;
  this.infousuario.endereco = this.endereco;
  this.infousuario.setor = this.setor;
  this.infousuario.infoEmpresa = this.infoEmpresa;
  this.infousuario.infoVagas = this.infoVagas;
  this.infousuario.usuario = this.usuario;
  console.log(this.infousuario);

  this.srv.insereInfoUsuario(this.infousuario).subscribe(
    res =>{
      alert("Cadastro efetuado com sucesso!");
      this.router.navigate(['/perfilpessoajuridica']);
    },
    err=>{
      alert("Erro ao inserir");
    }
  )
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