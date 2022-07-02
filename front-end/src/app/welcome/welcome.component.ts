import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contactDataService } from '../service/data/contact-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name = '';
  welcomeMessageFromService = '';
  constructor(private contactDataService: contactDataService) {}

  ngOnInit(): void {}

  getWelcomeMessage() {
    this.contactDataService.getMessage().subscribe(
      (text) => {
        this.welcomeMessageFromService = text;
      },
      (err) => {
        this.welcomeMessageFromService = 'error: ' + JSON.stringify(err);
      }
    );
  }
}
