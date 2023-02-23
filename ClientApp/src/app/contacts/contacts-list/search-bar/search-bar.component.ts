import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactDataService } from '../../contact-data.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css'],
})
export class SearchBarComponent {
  public faFilter = faFilter;
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
