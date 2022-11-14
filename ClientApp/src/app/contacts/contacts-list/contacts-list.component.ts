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
import { SortDirection } from '../enums/sort-direction';

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
      this.contactDataService.setInitialContactList(data);
    });

    this.sortedPropertyName.pipe(pairwise()).subscribe((propertyNames) => {
      const [prev, current] = propertyNames;
      if (prev !== current) {
        this.contactDataService.sort(current, this.sortDirection.getValue());
        this.sortDirection.next(SortDirection.Default);
      }
      switch (this.sortDirection.getValue()) {
        case SortDirection.Default:
          this.contactDataService.sort(current, this.sortDirection.getValue());
          this.sortDirection.next(SortDirection.Ascending);
          break;
        case SortDirection.Ascending:
          this.contactDataService.sort(current, this.sortDirection.getValue());
          this.sortDirection.next(SortDirection.Descending);
          break;
        case SortDirection.Descending:
          this.contactDataService.sort(current, this.sortDirection.getValue());
          this.sortDirection.next(SortDirection.Default);
          break;
        default:
          break;
      }
    });
  }

  onclick(propertyName: string) {
    this.sortedPropertyName.next(propertyName);
  }
}
