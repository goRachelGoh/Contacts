import { Component, OnInit } from '@angular/core';

import {
  faPencil,
  faTrashCan,
  faSave,
  faArrowUp,
  faArrowDown,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, pairwise } from 'rxjs';
import { ContactDataService } from '../contact-data.service';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
enum SortDirection {
  Default,
  Ascending,
  Descending,
}

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public faSave = faSave;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public faUserPlus = faUserPlus;
  public showEdit = false;
  public showSave = true;
  public sortedPropertyName = new BehaviorSubject<string>('');
  public sortDirection = new BehaviorSubject<SortDirection>(
    SortDirection.Default
  );
  public sortDirectionEnum = SortDirection;
  public contactsList: Contact[] = [];
  public copyList: any[] = [];
  constructor(
    public contactDataService: ContactDataService,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contactsList = data;
      console.log(this.contactsList);
      this.contactDataService.next(this.contactsList);
    });

    this.copyList = this.contactsList.slice();
    // this.contactsList = this.activatedRoute.snapshot.data.contacts;

    this.sortedPropertyName.pipe(pairwise()).subscribe((propertyNames) => {
      const [prev, current] = propertyNames;
      if (prev !== current) {
        this.sortDirection.next(SortDirection.Default);
      }
      switch (this.sortDirection.getValue()) {
        case SortDirection.Default:
          this.contactsList.sort((a, b) =>
            this.traverseObject(a, current).localeCompare(
              this.traverseObject(b, current)
            )
          );
          this.sortDirection.next(SortDirection.Ascending);
          break;
        case SortDirection.Ascending:
          this.contactsList.sort((a, b) =>
            this.traverseObject(b, current).localeCompare(
              this.traverseObject(a, current)
            )
          );
          this.sortDirection.next(SortDirection.Descending);
          break;
        case SortDirection.Descending:
          this.contactsList = Array.from(this.copyList);
          this.sortDirection.next(SortDirection.Default);
          break;
        default:
          break;
      }
    });
  }

  traverseObject(object: any, path: string): string {
    const pathArr = path.split('.');
    let finalValue = object;
    for (let i = 0; i < pathArr.length; i++) {
      finalValue = finalValue[pathArr[i]];
    }
    return finalValue || '';
  }

  onclick(propertyName: string) {
    this.sortedPropertyName.next(propertyName);
  }

  // Get the input value when onSearchTextChanged() triggers
  // searchText: string = '';
  // onSearchTextEntered(searchValue: string) {
  //   this.searchText = searchValue;
  // }
}
