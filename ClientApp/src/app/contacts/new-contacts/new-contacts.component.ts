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
  AsyncValidatorFn,
} from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ContactsService } from '../contacts.service';
import { Validators, AsyncValidator } from '@angular/forms';
import { EMPTY, iif, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  public faTrashCan = faTrashCan;
  public contactForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\-]+')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\-]+')]], //must be letters only
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
    this.contactsService
      .findDuplicateContact(this.contactForm.value)
      .pipe(
        switchMap((response) =>
          iif(
            () => response === null,
            this.contactsService.addContact(this.contactForm.value),
            EMPTY
          )
        )
      )
      .subscribe();
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
      zipcode: ['', [Validators.maxLength(5), Validators.pattern('^[0-9]+')]], //5 number
    });
  }

  //emails cannot be duplicate
  private buildEmailForm(): FormGroup {
    return this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }

  //phonenumbers cannot be duplicate
  private buildPhoneNumberForm(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10,}'),
          this.isDuplicatedPhoneNumber,
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

  public isDuplicatedPhoneNumber(input: FormControl) {
    const phoneFormGroup = input.parent;
    const phoneFormArray = phoneFormGroup?.parent as FormArray;

    if (phoneFormGroup && phoneFormArray) {
      const phoneNumbers =
        (phoneFormArray?.controls as FormGroup[])?.map(
          (group) => group.get('phoneNumber')?.value
        ) ?? [];

      let result = phoneNumbers.filter(
        (phoneNumber) => phoneNumber === input.value
      );
      return result.length <= 1 ? null : { isDuplicatedPhoneNumber: true };
    }
    return null;
  }
}
