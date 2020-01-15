import { Component,Input,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import {Document} from './document';
import { TokenStorageService } from '../auth/token-storage.service';
  
@Component({
    selector: 'edit',
    templateUrl:'./addDocument.html'
})

export class editDocument implements OnInit{
    form:any={};
    errorMessage:any;
    info:any;
    constructor(private http:AuthService,private token: TokenStorageService){
    }
    ngOnInit()
        {
          this.info={
            token:this.token.getToken()
          }
          if(this.info.token){
            this.http.getDoc().subscribe(
                data => {
                  this.form = data;
                  console.log(this.form);
                },
                error => {
                  this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
                });
              }
        }  
    onSubmit(){ 
    this.http.Edit(this.form).subscribe(
        data => {
          console.log(data);    
        }, 
        error => {
            console.log(error);
        }
      );
      window.location.replace("/home")
    }
}
