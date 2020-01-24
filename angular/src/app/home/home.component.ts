import { Component,Input,Output, OnInit,Directive,EventEmitter,QueryList, ViewChildren } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';
import {Document} from './document';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

 
export type sortDirection='asc'|'desc'|'';
const rotate: {[key: string]: sortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent{
  column:string;
  direction:sortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: sortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  documents:any[];
  info:any;
  errorMessage: string;
  private pages:any;
  private page:number=0;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(private token: TokenStorageService,private http:AuthService) { 
  }
  private doc:Document;
  
  delete(id:number)
  {
    this.http.Delete(id).subscribe(
      data => {
      console.log(data);    
    }, 
    error => {
        console.log(error);
    });
    window.location.reload;
  }
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    
    // sorting documents
    if (direction === '') {
      this.documents = this.documents;
    } else {
      this.documents = [...this.documents].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  ngOnInit() {
    this.info={
      token:this.token.getToken()
    }
    if(this.info.token){
      this.getData();
    }
  }
  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getData();
  }
  getData(){
    
    this.http.getInfo(this.page).subscribe(
      data => {
        this.documents = data.content;
        this.pages=new Array(data.totalPages);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
  
}
