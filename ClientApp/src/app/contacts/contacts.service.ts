import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from './models/contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements Resolve<Contact[]> {
  private url = 'http://localhost:4200/api/contacts';

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any[] | Observable<any[]> | Promise<any[]> {
    return this.getContacts();
  }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/contacts');
  }

  public getContactById(id: string | null): Observable<Contact> {
    return this.http.get<Contact>(`/api/contacts/${id}`);
  }

  public deleteContact(contact: Contact): Observable<any[]> {
    const url = `${this.url}/${contact.id}`;
    return this.http.delete<Contact[]>(url);
  }

  public addContact(contact: Contact): Observable<Contact> {
    const url = `${this.url}`;
    return this.http.post<Contact>(url, contact);
  }

  public updateContact(id: string, contact: Contact) {
    const url = `${this.url}/${id}`;
    return this.http.put(url, contact);
  }

  public findDuplicateContact(
    contact: Contact
  ): Observable<ValidationErrors | null> {
    const url = `${this.url}/duplicate`;
    return this.http.post<Contact>(url, contact);
  }
}
