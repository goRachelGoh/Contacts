import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewContactsComponent } from './new-contacts/new-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    ContactsListComponent,
    NewContactsComponent,
    ContactDetailsComponent,
    NavMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    ContactsListComponent,
    NewContactsComponent,
    ContactDetailsComponent,
    NavMenuComponent,
  ],
})
export class ContactsModule {}
