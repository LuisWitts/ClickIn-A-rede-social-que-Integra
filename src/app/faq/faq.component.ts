import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';
import * as $ from 'jquery';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { MyToken } from '../model/MyToken';

//Para funcionar o JQuery é preciso instalar as bibiliotecas a seguir:
//npm install jquery --save
//npm install @types/jquery
//e import * as $ from 'jquery'; no projeto.

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [ Globals ]
})
export class FaqComponent implements OnInit {

   usuario: Usuario = new Usuario();

   nomeCompleto:string;
   email:string;
   telefone:string;
   senha: string;
   senhaRepetida: string;
   senhaLogin: string;
   emailLogin: string;
   razaoSocial: string;
   nomeFantasia: string;
   cnpj: string;
   _msgErroNome: string = null;
   _msgErroTelefone: string = null;
   _msgErroEmail: string = null;
   _msgSenha: string = null;
   _msgSenhaForte: string = null;
   _msgSenhaFraca: string = null;
   _msgErroRazao: string = null;
   cont = 0;
   public _msgErroCnpj: string = null;
  

  constructor(public srv: UsuarioService, public router: Router, public _scrollToService: ScrollToService) { }

  ngOnInit() {

  }
  

   enviar(){
    alert("Mensagem enviada com sucesso! Aguarde nosso contato.");
  }

   valida(){
    

    if(this.email == null || this.nomeCompleto == null || this.telefone == null || this.senha == null || this.senhaRepetida == null){
      alert("Preencha todos os campos corretamente!");
      
    }
    else{

      if(this.email.indexOf("@") == -1 || this.email.indexOf(".") == -1){
        this._msgErroEmail = "Digite um e-mail válido";
      }
      else{
          this.cont++;
          this._msgErroEmail = "";
      }

      if(this.telefone.toString().length >= 10 && this.telefone.toString().length <=11){
          this.cont++;
          this._msgErroTelefone = "";       
      }
      else{
        this._msgErroTelefone = "Digite um telefone válido";
      }

      if (!this.isTipo(this.nomeCompleto))
      {
        this._msgErroNome = "Nome e/ou Sobrenome Inválidos";
      }
      else{
        this.cont++;
        this._msgErroNome = "";
      }

      if(this.senha != this.senhaRepetida){
        this._msgSenha = "As senhas digitadas não correspondem";
      }
        else{
          if(this.senha.length >= 10 && (this.senha.indexOf("@") != -1 || this.senha.indexOf("#") != -1 || this.senha.indexOf("$") != -1 || this.senha.indexOf("&") != -1) || this.senha.indexOf("%") != -1)
          {
            this.cont++;
          }
          else{
            this.cont++;
          }
        
        }

          if(this.cont >= 4)
          {
              this.cont = 0;
              this.enviarDados();
              
          }
          else{
            this.cont = 0;
          }

        }     



    }

  
   validaEmpresa(){

    console.log("entrou no validaEmpresa");

    if(this.email == null || this.razaoSocial == null || this.telefone == null || this.senha == null || this.senhaRepetida == null || this.nomeFantasia == null || this.cnpj == null){

      alert("Preencha todos os campos corretamente!");
    
    }
    else{

      if(this.email.indexOf("@") == -1 || this.email.indexOf(".") == -1){
        this._msgErroEmail = "Digite um e-mail válido";
      }
      else{
          this.cont++;
          this._msgErroEmail = "";
      }

      if(this.telefone.toString().length >= 10 && this.telefone.toString().length <=11){
          this.cont++;
          this._msgErroTelefone = "";       
      }
      else{
        this._msgErroTelefone = "Digite um telefone válido";
      }

      if (!this.isTipo(this.razaoSocial))
      {
        this._msgErroRazao = "Razão Social Inválidos";
      }
      else{
        this.cont++;
        this._msgErroNome = "";
      }

      if(this.senha != this.senhaRepetida){
        this._msgSenha = "As senhas digitadas não correspondem";
      }
        else{
          if(this.senha.length >= 10 && (this.senha.indexOf("@") != -1 || this.senha.indexOf("#") != -1 || this.senha.indexOf("$") != -1 || this.senha.indexOf("&") != -1) || this.senha.indexOf("%") != -1)
          {
            this.cont++;
          }
          else{
            this.cont++;
          }
        
        }

          if(this.cont >= 4)
          {
              this.cont = 0;
              this.enviarDadosEmpresa();
              
          }
          else{
            this.cont = 0;
          }

        }
  } 


     forcaSenha(){
      
          if(this.senha.length >= 10 && (this.senha.indexOf("@") != -1 || this.senha.indexOf("#") != -1 || this.senha.indexOf("$") != -1 || this.senha.indexOf("&") != -1) || this.senha.indexOf("%") != -1)
          {
            this._msgSenhaForte = "Senha Forte";
            this._msgSenha = null;
            this._msgSenhaFraca = null;
          }
          else{
            this._msgSenhaFraca = "Senha Fraca";
            this._msgSenhaForte = null;
            this._msgSenha = null;
            }
        
        
    }

     isTipo(pVal) { 
      var reTipo = /[A-z][ ][A-z]/; 
      return reTipo.test(pVal); 
    }


    enviarDados(){

      this.usuario.nome = this.nomeCompleto;
      this.usuario.email = this.email;
      this.usuario.telefone = this.telefone;
      this.usuario.senha = this.senha;
      this.usuario.tipo = "PF";

      console.log(this.usuario);
      this.srv.insere(this.usuario).subscribe(
        res =>{
          alert("Cadastro efetuado com sucesso!");
          $('#btnFecharUsuario').click();
        },
        err=>{
          console.log(err);
          alert("Erro ao inserir");
        }
      )

    }


    enviarDadosEmpresa(){

      this.usuario.cnpj = this.cnpj;
      this.usuario.email = this.email;
      this.usuario.telefone = this.telefone;
      this.usuario.senha = this.senha;
      this.usuario.tipo = "PJ";
      this.usuario.nomeFantasia = this.nomeFantasia;
      this.usuario.razaoSocial = this.razaoSocial;

      console.log(this.usuario);
      this.srv.insere(this.usuario).subscribe(
        res =>{
          alert("Cadastro efetuado com sucesso!");
          $('#btnFecharEmpresa').click();
        },
        err=>{
          console.log(err);
          alert("Erro ao inserir");
        }
      )

    }




    validaLogin(){

      this.usuario.email = this.emailLogin;
      this.usuario.senha = this.senhaLogin;

      this.srv.autenticar(this.usuario).subscribe(
        (res: MyToken)=>{
          // se deu certo        
          // armazeno o token no LocalStorage
          localStorage.setItem("MyToken", res.strToken);
          console.log(res.strToken);
          alert("E-mail e senha validados com sucesso!");
          this.router.navigate(['/feed']);
          
          $('#btnfecharLogin').click();
        },
        (err)=>{
          alert("Usuário não cadastrado no sistema");
        }
      );
    }

    /*
      this.usuario.email = this.emailLogin;
      this.usuario.senha = this.senhaLogin;
      this.router.navigate(['feed']);
      $('#btnfecharLogin').click();
      this.srv.recuperaLoginESenha(this.usuario).subscribe(
        (res:Usuario) =>{
          alert("E-mail e senha validados com sucesso!");
          Globals.user = res;
          this.router.navigate(['feed']);
          $('#btnfecharLogin').click();
        },
        err=>{
          alert("Usuário não cadastrado no sistema");
        }
      )}*/



    


   triggerScrollToQS() {
    
    const config: ScrollToConfigOptions = {
      target: 'sobrenos'
    };
 
    this._scrollToService.scrollTo(config);
  }

   triggerScrollToEm() {
    
    const config: ScrollToConfigOptions = {
      target: 'logo'
    };
 
    this._scrollToService.scrollTo(config);
  }

  }