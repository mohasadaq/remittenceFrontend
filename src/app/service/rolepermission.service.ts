import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:4200/v1/auth/'
  getRoles(){
    return this.http.get(`${this.url}/role`)
  }

  addRole(data:any){  
    return this.http.post(`${this.url}/role`,data)
   }

   editRole(data:any){  
    return this.http.put(`${this.url}/role`,data)
   }
   
   deleteRole(id:any){  
     return this.http.delete(`${this.url}/role/${id}`)
    }


    getPermissions(){
      return this.http.get(`${this.url}/permission`)
    }
  
    addPermission(data:any){  
      return this.http.post(`${this.url}/permission`,data)
     }
  
     editPermission(data:any){  
      return this.http.put(`${this.url}/permission`,data)
     }
     
     deletePermission(id:any){  
       return this.http.delete(`${this.url}/permission/${id}`)
      }

}
