import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService {
  // declaring empty behaviorsubject
  private mostRecentContactListData: BehaviorSubject<Contact[]> =
    new BehaviorSubject<Contact[]>([]);
  // recording the most recent version of contactList as an observable
  public mostRecentContactList: Observable<Contact[]> =
    this.mostRecentContactListData.asObservable();

  public next(contactsList: Contact[]): void {
    this.mostRecentContactListData.next(contactsList);
  }

  public filter(searchText: string) {
    return this.mostRecentContactList
      .pipe(
        map((contacts) => {
          return contacts.filter((contact) =>
            contact.firstName?.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      )
      .subscribe((res) => console.log(res));
  }
}
