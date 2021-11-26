import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LocalStorage{

    getData():any{
      return jwt_decode(localStorage.getItem('token') || '')
    }
}