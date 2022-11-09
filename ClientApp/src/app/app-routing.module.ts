import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './contacts/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ContactsService } from './contacts/contacts.service';
import { NewContactsComponent } from './contacts/new-contacts/new-contacts.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    // resolve: { contacts: ContactsService },
  },
  { path: 'new', component: NewContactsComponent },
  { path: 'edit/:id', component: NewContactsComponent },
  { path: 'details/:id', component: ContactDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
