import { Component,Input,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
  
@Component({
    selector: 'edit',
    templateUrl:'./addDocument.html'
})

export class editDocument implements OnInit{
    form:any={};
    errorMessage:any;
    info:any;
    id:number;
    constructor(private http:AuthService,private token: TokenStorageService,private activatedRoute:ActivatedRoute){
      this.id = activatedRoute.snapshot.params['id'];
      console.log(this.id); 
    }
    ngOnInit()
        {
          this.info={
            token:this.token.getToken()
          }
          if(this.info.token){
           
            this.http.getDoc(this.id).subscribe(
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
