import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({setHeaders:{
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }})).pipe(catchError((error: any )=>{
      console.log(error);
       this.toastr.error(error.error.error,'Opps !')
       throw error
    }))
  }
}
