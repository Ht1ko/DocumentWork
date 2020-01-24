import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import{Document} from '../home/document';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private addUrl='http://localhost:8080/api/auth/addDocument';
  private homeUrl ='http://localhost:8080/api/auth/home/';
  private editUrl='http://localhost:8080/api/auth/edit';
  private adminUrl='http://localhost:8080/api/auth/admin/';
  private editforUrl='http://localhost:8080/api/auth/editDocument';
  private deleteUrl='http://localhost:8080/api/auth/Delete';
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  Add(document:Document): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.addUrl,document, httpOptions);
  }
  Delete(id:number)
  {
    return this.http.post<JwtResponse>(this.deleteUrl,id,httpOptions);
  }
  Edit(document:Document): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.editforUrl,document, httpOptions);
  }
  getInfo(id:number):Observable<any>{
    return this.http.get<any>(this.homeUrl+id,httpOptions);
  }
  getAdmin(id:number):Observable<any>{
    return this.http.get<any>(this.adminUrl+id,httpOptions);
  }
  getDoc(id:number):Observable<Document>{
    return this.http.get<Document>(this.editUrl+`/${id}`,httpOptions);
  }
  
}
