import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './contacts/home/home.component';
import { NewContactsComponent } from './contacts/new-contacts/new-contacts.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  {
    path: 'contact',
    component: HomeComponent,
  },
  { path: 'new', component: NewContactsComponent },
  { path: 'edit/:id', component: NewContactsComponent },
  { path: 'detail/:id', component: ContactDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
