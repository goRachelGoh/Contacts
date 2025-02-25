import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ContactDataService } from '../contact-data.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public contactsList: any[] = [];
  public contact: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.contactsService.getContactById(id).subscribe((data) => {
        this.contact = data;
        console.log(data);
      });
    });
  }

  // TODO: alert prints before the exception, Need to change the order!! --> when server is down,
  onDelete(contact: any) {
    this.contactsService
      .deleteContact(contact)
      .subscribe(
        () =>
          (this.contactsList = this.contactsList.filter(
            (eachcontact) => eachcontact.id !== contact.id
          ))
      );
    alert('Deletion Successful! Going back to Main page');
    this.router.navigate(['/home']);
  }

  onClickEditor(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
}
