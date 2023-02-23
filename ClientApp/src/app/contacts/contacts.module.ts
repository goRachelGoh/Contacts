import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewContactsComponent } from './new-contacts/new-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SearchBarComponent } from './contacts-list/search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ContactsListComponent,
    NewContactsComponent,
    ContactDetailsComponent,
    SearchBarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],

  exports: [HomeComponent, ContactsListComponent, SearchBarComponent],
})
export class ContactsModule {}
