import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authenticatedUser= new EventEmitter<any>();

  post(data: any , controllerName: string , action?: string): Observable<any> {

    const httpOptions: Object = {
      headers: new HttpHeaders ({'Accept':'application/json' , 'Content-type':'application/json'})
    }

    if(action)
      return this.http.post(`${environment.baseUrl}/${controllerName}/${action}`,data , httpOptions);

    return this.http.post(`${environment.baseUrl}/${controllerName}`,data , httpOptions);
  }

  get(controllerName: string , action?: string): Observable<any>{

    if(action)
      return this.http.get(`${environment.baseUrl}/${controllerName}/${action}`);

    return this.http.get(`${environment.baseUrl}/${controllerName}`);
  }

  getByParameter(id:any ,controllerName: string , action?: string): Observable<any>{

    if(action)
      return this.http.get(`${environment.baseUrl}/${controllerName}/${action}/${id}`);

    return this.http.get(`${environment.baseUrl}/${controllerName}/${id}`);
  }

  put(id:any ,data:any , controllerName: string , action?:string): Observable<any>{

    const httpOptions: Object = {
      headers: new HttpHeaders ({'Accept':'application/json' , 'Content-type':'application/json'})
    }

    if(action)
      return this.http.put(`${environment.baseUrl}/${controllerName}/${action}/${id}`,data , httpOptions);

    return this.http.put(`${environment.baseUrl}/${controllerName}/${id}`,data , httpOptions);
    
  }

  delete(id: any, controllerName: string , action?: string){
    
    if(action)
      return this.http.delete(`${environment.baseUrl}/${controllerName}/${action}/${id}`);

    return this.http.delete(`${environment.baseUrl}/${controllerName}/${id}`);
  }

}
