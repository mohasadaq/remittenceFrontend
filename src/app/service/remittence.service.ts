import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RemittenceService {

 constructor(private http : HttpClient) { }

  getRemittence(){
    return this.http.get('http://localhost:4200/v1/remittence')
  }

  registorRemittence(data : any){
    return this.http.post('http://localhost:4200/v1/remittence',data)
  }

  aproveRemittence(data : any){
    return this.http.put('http://localhost:4200/v1/remittence',data)
  }

  deleteRemittence(remittenceId : any){
    return this.http.delete(`http://localhost:4200/v1/remittence/${remittenceId}`)
  }
}
