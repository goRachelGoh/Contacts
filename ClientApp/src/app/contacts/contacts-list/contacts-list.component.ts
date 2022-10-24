import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faPencil,
  faTrashCan,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ContactsService } from '../contacts.service';
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
  public showEdit = false;
  public showSave = true;
  public contactsList: any[] = [];
  public sortedPropertyName = new BehaviorSubject<string>('');
  public sortDirection = new BehaviorSubject<SortDirection>(
    SortDirection.Default
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactsList = this.activatedRoute.snapshot.data.contacts;
    console.log(this.contactsList);

    this.sortedPropertyName.subscribe((propertyName) => {
      switch (this.sortDirection.getValue()) {
        case SortDirection.Default:
          this.contactsList.sort((a, b) =>
            a[propertyName].localeCompare(b[propertyName])
          );
          this.sortDirection.next(SortDirection.Ascending);
          break;
        case SortDirection.Ascending:
          this.contactsList.sort((a, b) =>
            b[propertyName].localeCompare(a[propertyName])
          );
          this.sortDirection.next(SortDirection.Descending);
          break;
        case SortDirection.Descending:
          this.sortDirection.next(SortDirection.Default);
          break;
        default:
          break;
      }
    });
  }

  //Delete a contact when clicked
  onDelete(contact: any) {
    this.contactsService
      .deleteContact(contact)
      .subscribe(
        () =>
          (this.contactsList = this.contactsList.filter(
            (eachcontact) => eachcontact.id !== contact.id
          ))
      );
  }

  //Update the contact
  onUpdate(contact: any) {}

  onclick(propertyName: string) {
    this.sortedPropertyName.next(propertyName);
  }
}
