import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http : HttpClient) { }

  getCountry(){
    return this.http.get('http://localhost:4200/v1/operation/countries')
  }

  addCountry(data:any){  
    return this.http.post('http://localhost:4200/v1/operation/countries',data)
   }

   editCountry(data:any){  
    return this.http.put('http://localhost:4200/v1/operation/countries',data)
   }

   deleteCountry(id:any){  
     return this.http.delete(`http://localhost:4200/v1/operation/countries/${id}`)
    }

    // state url
    getState(){
      return this.http.get('http://localhost:4200/v1/operation/state')
    }
  
    addState(data:any){  
      return this.http.post('http://localhost:4200/v1/operation/state',data)
     }
  
     editState(data:any){  
      return this.http.put('http://localhost:4200/v1/operation/state',data)
     }
  
     deleteState(id:any){  
       return this.http.delete(`http://localhost:4200/v1/operation/state/${id}`)
      }

      // city url
    getCity(){
      return this.http.get('http://localhost:4200/v1/operation/city')
    }
  
    addCity(data:any){  
      return this.http.post('http://localhost:4200/v1/operation/city',data)
     }
  
     editCity(data:any){  
      return this.http.put('http://localhost:4200/v1/operation/city',data)
     }
  
     deleteCity(id:any){  
       return this.http.delete(`http://localhost:4200/v1/operation/city/${id}`)
      }

      // currency url
    getCurrency(){
      return this.http.get('http://localhost:4200/v1/operation/currency')
    }
  
    addCurrency(data:any){  
      return this.http.post('http://localhost:4200/v1/operation/currency',data)
     }
  
     editCurrency(data:any){  
      return this.http.put('http://localhost:4200/v1/operation/currency',data)
     }
  
     deleteCurrency(id:any){  
       return this.http.delete(`http://localhost:4200/v1/operation/currency/${id}`)
      }

  

}
