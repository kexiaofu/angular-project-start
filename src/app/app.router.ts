// native component
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// views

// 守卫
@Injectable()
export class AuthService implements CanActivate {
  constructor( private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Observable((observer) => {
      // 做一些判断
      observer.next(true);
      observer.complete();
    });
  }
}

export const appRoutes: Routes =[
  {path: '', pathMatch: 'full', redirectTo: '/'}
  ];
