import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  constructor(private http : HttpClient) { }

  getRoles(){
    return this.http.get('http://localhost:4200/v1/auth/role')
  }

  addRole(data:any){  
    return this.http.post('http://localhost:4200/v1/auth/role',data)
   }

   editRole(data:any){  
    return this.http.put('http://localhost:4200/v1/auth/role',data)
   }
   
   deleteRole(id:any){  
     return this.http.delete(`http://localhost:4200/v1/auth/role/${id}`)
    }

}
