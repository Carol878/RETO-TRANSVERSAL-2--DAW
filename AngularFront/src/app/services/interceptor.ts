import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // No enviar token en login o registro
  if (req.url.includes('/usuarios/login') || req.url.includes('/usuarios/registro')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    const reqClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqClonada);
  }

  return next(req);
};