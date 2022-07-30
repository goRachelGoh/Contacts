import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ContactsService } from './contacts/contacts.service';
import { NewContactsComponent } from './new-contacts/new-contacts.component';

const routes: Routes = [
  // {
  //   path: 'fetch-data',
  //   component: ContactsListComponent,
  //   pathMatch: 'full',
  //   resolve: { contacts: ContactsService },
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewContactsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
