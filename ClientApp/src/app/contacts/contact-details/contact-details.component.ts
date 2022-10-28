import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPencil,
  faTrashCan,
  faSave,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
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
}
