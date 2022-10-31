import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faPencil,
  faTrashCan,
  faSave,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, pairwise } from 'rxjs';
import { ContactsService } from '../contacts.service';
enum SortDirection {
  Default,
  Ascending,
  Descending,
}

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public faSave = faSave;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public faUserPlus = faUserPlus;
  public showEdit = false;
  public showSave = true;
  public contactsList: any[] = [];
  public sortedPropertyName = new BehaviorSubject<string>('');
  public sortDirection = new BehaviorSubject<SortDirection>(
    SortDirection.Default
  );
  public sortDirectionEnum = SortDirection;
  public copyList: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactsList = this.activatedRoute.snapshot.data.contacts;
    this.copyList = this.contactsList.slice();
    console.log(this.contactsList);

    this.sortedPropertyName.pipe(pairwise()).subscribe((propertyNames) => {
      const [prev, current] = propertyNames;
      if (prev !== current) {
        this.sortDirection.next(SortDirection.Default);
      }
      switch (this.sortDirection.getValue()) {
        case SortDirection.Default:
          this.contactsList.sort((a, b) =>
            this.traverseObject(a, current).localeCompare(
              this.traverseObject(b, current)
            )
          );
          this.sortDirection.next(SortDirection.Ascending);
          break;
        case SortDirection.Ascending:
          this.contactsList.sort((a, b) =>
            this.traverseObject(b, current).localeCompare(
              this.traverseObject(a, current)
            )
          );
          this.sortDirection.next(SortDirection.Descending);
          break;
        case SortDirection.Descending:
          this.contactsList = Array.from(this.copyList);
          this.sortDirection.next(SortDirection.Default);
          break;
        default:
          break;
      }
    });
  }

  traverseObject(object: any, path: string): any {
    // const propertyName = path.split('.');
    // propertyName.forEach((item) => {
    //   if (item.object === undefined) {
    //     return `${item}`;
    //   }
    //   return `${item.object}`;
    // });
  }

  onclick(propertyName: string) {
    this.sortedPropertyName.next(propertyName);
  }
}
