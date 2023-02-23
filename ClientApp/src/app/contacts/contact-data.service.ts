import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact } from './models/contact';
import { SortDirection } from './enums/sort-direction';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService {
  private mostRecentContactListData: BehaviorSubject<Contact[]> =
    new BehaviorSubject<Contact[]>([]);
  public mostRecentContactList: Observable<Contact[]> =
    this.mostRecentContactListData.asObservable();
  private initialContactList: Contact[] = [];

  constructor() {
    this.mostRecentContactListData.subscribe((data) => {
      data.forEach(
        (contact) =>
          (contact.fullTextString = this.buildFullTextString(contact))
      );
    });
  }

  public setInitialContactList(data: Contact[]) {
    this.initialContactList = data;
    this.nextContactList(data);
  }

  // assign a value to fullTextString
  public buildFullTextString(contact: Contact): string {
    let result = '';
    if (contact.firstName) {
      result += contact.firstName + ' ';
    }
    if (contact.lastName) {
      result += contact.lastName + ' ';
    }
    if (contact.addresses[0].city) {
      result += contact.addresses[0].city + ' ';
    }
    if (contact.addresses[0].state) {
      result += contact.addresses[0].state;
    }
    return result.toLowerCase();
  }

  public nextContactList(contactsList: Contact[]): void {
    this.mostRecentContactListData.next(contactsList);
  }

  public filter(searchText: string): void {
    const data = this.initialContactList.filter((contact) =>
      contact.fullTextString?.includes(searchText.toLowerCase())
    );
    this.nextContactList(data);
  }

  public sort(propertyPath: string, sortDirection: SortDirection) {
    const copyList = this.mostRecentContactListData.getValue().slice();
    switch (sortDirection) {
      case SortDirection.Default:
        copyList.sort((a, b) =>
          this.traverseObject(a, propertyPath).localeCompare(
            this.traverseObject(b, propertyPath)
          )
        );
        this.nextContactList(copyList);
        break;
      case SortDirection.Ascending:
        copyList.sort((a, b) =>
          this.traverseObject(b, propertyPath).localeCompare(
            this.traverseObject(a, propertyPath)
          )
        );
        this.nextContactList(copyList);
        break;
      case SortDirection.Descending:
        this.nextContactList(this.initialContactList.slice());
        break;
      default:
        break;
    }
  }

  private traverseObject(object: any, path: string): string {
    const pathArr = path.split('.');
    let finalValue = object;
    for (let i = 0; i < pathArr.length; i++) {
      finalValue = finalValue[pathArr[i]];
    }
    return finalValue || '';
  }
}
