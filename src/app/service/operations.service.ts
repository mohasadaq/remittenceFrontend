import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http : HttpClient) { }
  url : string = 'http://localhost:4200/v1/operation'

  getCountry(){
    return this.http.get(`${this.url}/countries`)
  }

  addCountry(data:any){  
    return this.http.post(`${this.url}/countries`,data)
   }

   editCountry(data:any){  
    return this.http.put(`${this.url}/countries`,data)
   }

   deleteCountry(id:any){  
     return this.http.delete(`${this.url}/countries/${id}`)
    }

    // state url
    getState(){
      return this.http.get(`${this.url}/state`)
    }
  
    addState(data:any){  
      return this.http.post(`${this.url}/state`,data)
     }
  
     editState(data:any){  
      return this.http.put(`${this.url}/state`,data)
     }
  
     deleteState(id:any){  
       return this.http.delete(`${this.url}/state/${id}`)
      }

      // city url
    getCity(){
      return this.http.get(`${this.url}/city`)
    }
  
    addCity(data:any){  
      return this.http.post(`${this.url}/city`,data)
     }
  
     editCity(data:any){  
      return this.http.put(`${this.url}/city`,data)
     }
  
     deleteCity(id:any){  
       return this.http.delete(`${this.url}/city/${id}`)
      }

      // currency url
    getCurrency(){
      return this.http.get(`${this.url}/currency`)
    }
  
    addCurrency(data:any){  
      return this.http.post(`${this.url}/currency`,data)
     }
  
     editCurrency(data:any){  
      return this.http.put(`${this.url}/currency`,data)
     }
  
     deleteCurrency(id:any){  
       return this.http.delete(`${this.url}/currency/${id}`)
      }

  // Payment url
  getPayment(){
    return this.http.get(`${this.url}/payment`)
  }

  addPayment(data:any){  
    return this.http.post(`${this.url}/payment`,data)
   }

   editPayment(data:any){  
    return this.http.put(`${this.url}/payment`,data)
   }

   deletePayment(id:any){  
     return this.http.delete(`${this.url}/payment/${id}`)
    }

      // status url
  getStatus(){
    return this.http.get(`${this.url}/status`)
  }

  addStatus(data:any){  
    return this.http.post(`${this.url}/status`,data)
   }


}
