import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPencil,
  faTrashCan,
  faSave,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public faArrowLeft = faArrowLeft;
  public faSave = faSave;
  public contactsList: any[] = [];
  contact: any;
  constructor(
    private Activatedroute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    const id = this.Activatedroute.snapshot.paramMap.get('id');
    console.log(id);
    const contact = this.contactsService.getContactById(id);
    contact.subscribe((response) => {
      console.log(response);
    });
    // console.log(contact);
  }

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
}
