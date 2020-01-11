import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
  
@Component({
    selector: 'show',
    templateUrl:'./show.html'
})

export class showDocument implements OnInit{
    form:any={};
    errorMessage:any;
    constructor(private http:AuthService){
    }
    getData(){
        this.http.getDoc().subscribe(
            data => {
              this.form = data;
              console.log(this.form);
            },
            error => {
              this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
            });   
    }
    ngOnInit()
        {
            this.getData();    
        }  
}
