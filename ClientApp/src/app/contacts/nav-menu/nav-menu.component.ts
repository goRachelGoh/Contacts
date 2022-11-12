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

  public search(): Contact[] {
    this.searchFormControl.valueChanges.subscribe((searchString) => {
      const searchResult = this.contactDataService.filter(searchString);
      // this.contactDataService.next(searchResult);
    });
    return [];
  }
}
