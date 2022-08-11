import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';

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
    addresses: this.formBuilder.array([this.buildAddressForm()]),
    emailAddresses: this.formBuilder.array([this.buildEmailForm()]),
    phoneNumbers: this.formBuilder.array([this.buildPhoneNumberForm()]),
    address: this.formBuilder.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    contactInfo: this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
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

  private buildAddressForm(): FormGroup {
    return this.formBuilder.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  private buildEmailForm(): FormGroup {
    return this.formBuilder.group({
      emailAddress: ['', Validators.required],
    });
  }

  private buildPhoneNumberForm(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.required],
    });
  }

  public addEmailAddress() {
    const emailAddresses = this.contactForm.get('emailAddresses') as FormArray;
    emailAddresses.push(this.buildEmailForm());
  }

  public addPhoneNumber() {
    const phoneNumbers = this.contactForm.get('phoneNumbers') as FormArray;
    phoneNumbers.push(this.buildPhoneNumberForm());
  }

  public addAddress() {
    const addresses = this.contactForm.get('addresses') as FormArray;
    addresses.push(this.buildAddressForm());
  }
}
