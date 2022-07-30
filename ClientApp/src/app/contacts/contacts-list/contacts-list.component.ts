import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  public contactsList: any[] = [];

  constructor(private activatedRoute: ActivatedRouteSnapshot) {}

  ngOnInit(): void {
    this.contactsList = this.activatedRoute.data.contacts;
    console.log(this.contactsList);
  }
}
