import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contact } from '../list-contact/llist-contact.component';
import { contactDataService } from '../service/data/contact-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: contact = new contact(-1, '', '', '', '', '');
  id: number = -1;
  username: any = sessionStorage.getItem('authenticatedUser');
  err = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private contactService: contactDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.contactService.retrieveContact(this.id).subscribe(
        (data) => {
          this.contact = data;
          console.log(data);
        },
        (err) => {
          this.err = true;
          this.errorMessage = err;
        }
      );
    }
  }

  saveContact() {
    if (this.id == -1) {
      this.err = false;
      this.contactService.savecontact(this.contact).subscribe(
        (data) => {
          this.router.navigate(['contacts']);
          console.log(data);
        },
        (err) => {
          alert('Error Occured');
          this.err = true;
          this.errorMessage = err.message;
          console.log(err);
        }
      );
    } else {
      this.err = false;
      this.contactService.updateContact(this.id, this.contact).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['contacts']);
        },
        (err) => {
          this.err = true;
          this.errorMessage = err.error;
        }
      );
    }
  }
}
