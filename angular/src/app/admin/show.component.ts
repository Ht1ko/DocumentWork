import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
  
@Component({
    selector: 'show',
    templateUrl:'./show.html'
})

export class showDocument implements OnInit{
    form:any={};
    errorMessage:any;
    id:number;
    constructor(private http:AuthService,private activatedRoute:ActivatedRoute){
      this.id = activatedRoute.snapshot.params['id'];
      console.log(this.id); 
    }
    getData(){
      this.http.getDoc(this.id).subscribe(
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
