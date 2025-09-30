import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // Skip auth for login, register, and refresh endpoints
  if (
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register') ||
    req.url.includes('/api/auth/refresh')
  ) {
    return next(req);
  }

  // Add token to requests
  const token = auth.getAccessToken();
  let authReq = req;
  if (token) {
    authReq = addTokenHeader(authReq, token);
  }

  return next(authReq);
};

// SET the token to the request header
function addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  });
}