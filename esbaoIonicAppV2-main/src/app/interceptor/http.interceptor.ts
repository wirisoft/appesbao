import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth.service';

export const httpInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
  
  
  ): Observable<HttpEvent<any>> => {

    const authService = inject(AuthService);
    const token = authService.getToken();
  
    if (token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloned);
    }else{
      return next(request);
  
    }
  
   
  };
