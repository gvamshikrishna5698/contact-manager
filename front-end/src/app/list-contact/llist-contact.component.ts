import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contactDataService } from '../service/data/contact-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

export class contact {
  constructor(
    public contactId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public countryCode: string,
    public number: string
  ) {}
}

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],
})
export class ListContactComponent implements OnInit {
  contacts: contact[] = [];

  message: string = '';

  username: any = sessionStorage.getItem('authenticatedUser');

  constructor(
    private contactService: contactDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshContacts();
  }

  refreshContacts() {
    this.contactService.getAllContacts().subscribe(
      (response) => this.doSuccessResponse(response),
      (error) => this.doErrorResponse(error)
    );
  }

  doSuccessResponse(response: any) {
    // console.log(response)
    this.contacts = response;
  }

  doErrorResponse(error: any) {}

  deleteContact(id: number) {
    console.log(`delete Todo ${id}`);
    this.contactService.deleteContact(id).subscribe(
      (response) => {
        this.message = `The contact has Deleted Successfully !`;
        this.refreshContacts();
      },
      (error) => {
        this.message = 'Some error occured Contact System Administrator';
        this.refreshContacts();
      }
    );
  }

  updateContact(id: number) {
    this.router.navigate(['contact', id]);
  }

  createContact() {
    this.router.navigate(['contact', -1]);
  }
}
