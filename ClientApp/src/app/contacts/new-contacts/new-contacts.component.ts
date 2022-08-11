import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  public contactForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.formBuilder.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    contactInfo: this.formBuilder.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    }),
  });

  constructor(
    private contactsService: ContactsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.invalid) {
      alert('Check your data again');
      return;
    }
    this.contactsService
      .addContact(this.contactForm.value)
      .subscribe((contact) => {
        console.log(contact);
      });
  }
}
