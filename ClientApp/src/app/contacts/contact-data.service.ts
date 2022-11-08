import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService {
  private mostRecentContactListData: BehaviorSubject<Contact> =
    new BehaviorSubject<Contact>([]);
  public mostRecentContactList: Observable<Contact> =
    this.mostRecentContactListData.asObservable();
}
