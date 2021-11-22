import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  userAuth(data :any){
    return this.http.post('http://localhost:4200/v1/auth',data)
  }

  customerAuth(data :any){
    return this.http.post('http://localhost:4200/v1/auth/customer',data)
  }


  getRolePermission(data : any){    
    this.http.post(`http://localhost:4200/v1/auth/rolepermission`,data).subscribe((res :any)=>{
      localStorage.setItem('rolesPermission',JSON.stringify(res.data))
    })
  }

  
}
