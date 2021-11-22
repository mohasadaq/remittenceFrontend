import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasPermission(next);
  }

  hasPermission(component: any): boolean {
    return this.checkPermission(component.data.permission);
  }

  checkPermission(componentName: any) {
    let permissionList: any = JSON.parse(
      localStorage.getItem('rolesPermission') || '[]'
    );
    if (
      permissionList.length &&
      permissionList.filter((p: any) => p.permissionname == componentName)
        .length > 0
    ) {
      return true;
    }
    return false;
  }
}
