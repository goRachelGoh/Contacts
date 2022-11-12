import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactDataService } from '../contact-data.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  public searchFormControl: FormControl = new FormControl();

  constructor(private contactDataService: ContactDataService) {}

  ngOnInit(): void {
    this.search();
  }

  public search(): void {
    this.searchFormControl.valueChanges.subscribe((searchString) => {
      this.contactDataService.filter(searchString);
    });
  }
}
