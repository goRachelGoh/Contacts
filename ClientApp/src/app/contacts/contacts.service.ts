import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements Resolve<any[]> {
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any[] | Observable<any[]> | Promise<any[]> {
    return this.getContacts();
  }

  public getContacts(): Observable<any[]> {
    return this.http.get<any[]>('/contacts');
  }
}
