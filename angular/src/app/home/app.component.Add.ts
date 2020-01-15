import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
  
@Component({
    selector: 'add',
    templateUrl:'./addDocument.html'
})

export class addDocument implements OnInit{
    form:any={};
    info:any;
    constructor(private addService:AuthService,private token: TokenStorageService){
    }
    ngOnInit(){
      this.info={
        token:this.token.getToken()
      }
    }
    onSubmit(){
    this.addService.Add(this.form).subscribe(
        data => {
          console.log(data); 
          window.location.replace("/home");   
        }, 
        error => {
            console.log(error);
        }
      );
    }
}
