import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  public contactsList: any[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}

  createContact(contactsform: any[]) {
    console.log(contactsform);
    this.contactsService
      .addContact(contactsform)
      .subscribe((contact) => this.contactsList.push(contact));
  }
}
