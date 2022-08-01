import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ContactsListComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [ContactsListComponent],
})
export class ContactsModule {}
