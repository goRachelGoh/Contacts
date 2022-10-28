import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
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

  public getContactById(id: any): Observable<any[]> {
    return this.http.get<any[]>(`/api/contacts/${id}`);
  }

  public deleteContact(contact: any): Observable<any[]> {
    const url = `${this.url}/${contact.id}`;
    return this.http.delete<any[]>(url);
  }

  public addContact(contact: any): Observable<any[]> {
    const url = `${this.url}`;
    return this.http.post<any>(url, contact);
  }

  public findDuplicateContact(
    contact: any
  ): Observable<ValidationErrors | null> {
    const url = `${this.url}/duplicate`;
    return this.http.post<any>(url, contact);
  }
}
