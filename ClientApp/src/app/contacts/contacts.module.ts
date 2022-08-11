import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewContactsComponent } from './new-contacts/new-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { PipesModule } from '../pipes/pipes.module';
=======
>>>>>>> 512ee167371211bf13af3c68d4529f8973ba095d

@NgModule({
  declarations: [ContactsListComponent, NewContactsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    PipesModule,
=======
>>>>>>> 512ee167371211bf13af3c68d4529f8973ba095d
  ],
  exports: [ContactsListComponent, NewContactsComponent],
})
export class ContactsModule {}
