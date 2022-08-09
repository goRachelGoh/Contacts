import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements Resolve<any[]> {
  private url = 'http://localhost:4200/api/contacts';

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any[] | Observable<any[]> | Promise<any[]> {
    return this.getContacts();
  }

  public getContacts(): Observable<any[]> {
    return this.http.get<any[]>('/api/contacts');
  }

  public deleteContact(contact: any): Observable<any[]> {
    const url = `${this.url}/${contact.id}`;
    return this.http.delete<any[]>(url);
  }

  public addContact(contact: any): Observable<any[]> {
    const url = `${this.url}`;
    return this.http.post<any[]>(url, contact);
  }

  // public updateContact(contact: any): Observable<any[]> {
  //   const url = `${this.url}/${contact.id}`;
  //   return this.http.put<any[]>(url, contact, httpOptions);
  // }
}
