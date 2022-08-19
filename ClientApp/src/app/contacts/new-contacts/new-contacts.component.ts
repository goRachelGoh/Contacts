import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ContactsService } from '../contacts.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  public faTrashCan = faTrashCan;
  public contactForm = this.formBuilder.group({
    firstName: ['', [Validators.required, this.noSpaceAllowed]], //must be letters only
    lastName: ['', [Validators.required, this.noSpaceAllowed]], //must be letters only
    addresses: this.formBuilder.array([this.buildAddressForm()]),
    emailAddresses: this.formBuilder.array([this.buildEmailForm()]),
    phoneNumbers: this.formBuilder.array([this.buildPhoneNumberForm()]), //number only
  });

  constructor(
    private contactsService: ContactsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.contactForm);
    if (this.contactForm.invalid) {
      alert('Check your data again');
      return;
    }
    this.contactsService
      .addContact(this.contactForm.value)
      .subscribe((contactForm) => {
        console.log(contactForm);
      });
  }

  private buildAddressForm(): FormGroup {
    return this.formBuilder.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.maxLength(5), Validators.pattern('^[0-9]*$')]], //5 number
    });
  }

  //emails cannot be duplicate
  private buildEmailForm(): FormGroup {
    return this.formBuilder.group({
      emailAddress: ['', [Validators.required, this.notValidEmail]],
    });
  }

  //phonenumbers cannot be duplicate
  private buildPhoneNumberForm(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[^[0-9]*$]'),
        ],
      ],
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

  public deleteEmail(index: any) {
    const emailAddresses = this.contactForm.get('emailAddresses') as FormArray;
    emailAddresses.removeAt(index);
  }

  public deletePhoneNumber(index: any) {
    const phoneNumbers = this.contactForm.get('phoneNumbers') as FormArray;
    phoneNumbers.removeAt(index);
  }

  public noSpaceAllowed(input: FormControl) {
    if (input.value != null && input.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  public notValidEmail(input: FormControl) {
    if (!input.value.includes('@')) {
      return { notValidEmail: true };
    }
    return null;
  }
}
