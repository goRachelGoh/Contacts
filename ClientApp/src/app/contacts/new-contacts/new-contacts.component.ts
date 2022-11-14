import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ContactsService } from '../contacts.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Address } from '../models/address';
import { Email } from '../models/email';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  public states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  public faTrashCan = faTrashCan;
  public faArrowLeft = faArrowLeft;
  public contactForm = new FormGroup({});
  public contact: any;
  editMode: boolean = false;
  private id: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.editMode = true;
      this.contact = this.contactsService
        .getContactById(this.id)
        .subscribe((data) => {
          this.initForm(data);
          console.log(data); // this data has IDs
        });
    } else {
      this.initForm();
      console.log(this.contactForm.value);
      // this.contactForm.valueChanges.subscribe(() => {
      //   console.log(this.contactForm);
      // });
    }
  }

  onSubmit() {
    if (this.id) {
      this.contactsService
        .updateContact(this.id, this.contactForm.value)
        .subscribe();
      this.contactForm.reset();
      alert('Update Successful!');
    } else {
      this.contactsService
        .findDuplicateContact(this.contactForm.value)
        .subscribe((response) => {
          if (response === null) {
            {
              if (
                this.contactForm?.errors &&
                this.contactForm.hasError('isDuplicatedContact')
              ) {
                delete this.contactForm.errors['isDuplicatedContact'];
                this.contactForm.updateValueAndValidity();
              }
              console.log(this.contactForm.errors);
              this.contactsService
                .addContact(this.contactForm.value)
                .subscribe();
              this.contactForm.reset();
              alert('Submission Successful!');
            }
          } else {
            this.contactForm.setErrors(response);
            console.log(response);
          }
        });
      console.log(this.contactForm.value);
    }
  }

  private buildAddressForm(address?: Address): FormGroup {
    return this.formBuilder.group({
      streetAddress: [address?.streetAddress ?? '', Validators.required],
      city: [address?.city ?? '', Validators.required],
      state: [address?.state ?? '', Validators.required],
      zipcode: [
        address?.zipCode ?? '',
        [Validators.maxLength(5), Validators.pattern('^[0-9]+')],
      ], //5 number
    });
  }

  //emails cannot be duplicate
  private buildEmailForm(email?: Email): FormGroup {
    return this.formBuilder.group({
      emailAddress: [
        email?.emailAddress ?? '',
        [Validators.required, Validators.email],
      ],
    });
  }

  //phonenumbers cannot be duplicate
  private buildPhoneNumberForm(phone?: Phone): FormGroup {
    return this.formBuilder.group({
      id: [phone?.id ?? null],
      phoneNumber: [
        phone?.phoneNumber ?? '',
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
    console.log(emailAddresses.value);
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
    console.log(emailAddresses.value);
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

  private initForm(contact?: Contact) {
    this.contactForm = this.formBuilder.group({
      firstName: [
        contact?.firstName ?? '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\-]+')],
      ],
      lastName: [
        contact?.lastName ?? '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\-]+')],
      ],
      company: [contact?.company ?? ''],
      addresses: this.formBuilder.array(
        contact?.addresses?.map((a) => this.buildAddressForm(a)) ?? [
          this.buildAddressForm(),
        ]
      ),
      emailAddresses: this.formBuilder.array(
        contact?.emailAddresses?.map((email) => this.buildEmailForm(email)) ?? [
          this.buildEmailForm(),
        ]
      ),
      phoneNumbers: this.formBuilder.array(
        contact?.phoneNumbers?.map((p) => this.buildPhoneNumberForm(p)) ?? [
          this.buildPhoneNumberForm(),
        ]
      ),
    });
  }
}
