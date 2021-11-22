import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:4200/v1/user')
  }

  addUser(data:any){  
    return this.http.post('http://localhost:4200/v1/user',data)
   }
   
   deleteUser(id:any){  
     return this.http.delete(`http://localhost:4200/v1/user/${id}`)
    }

}
