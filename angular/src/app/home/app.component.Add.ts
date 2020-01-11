import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
  
@Component({
    selector: 'add',
    templateUrl:'./addDocument.html'
})

export class addDocument{
    form:any={};
    constructor(private addService:AuthService){
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
