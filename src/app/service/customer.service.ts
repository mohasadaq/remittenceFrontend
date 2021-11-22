import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  getCustomers(){
    return this.http.get('http://localhost:4200/v1/customer')
  }

  addCustomer(data:any){  
    return this.http.post('http://localhost:4200/v1/customer',data)
   }

   editCustomer(data:any){  
    return this.http.put('http://localhost:4200/v1/customer',data)
   }
   
   deleteCustomer(id:any){  
     return this.http.delete(`http://localhost:4200/v1/customer/${id}`)
    }

}
