import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/app.constants';
import { contact, Todo } from 'src/app/list-contact/llist-contact.component';

@Injectable({
  providedIn: 'root',
})
export class contactDataService {
  constructor(private httpClient: HttpClient) {}

  getAllContacts() {
    return this.httpClient.get<contact[]>(`${API_URL}/contacts`);
  }

  deleteContact(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/contacts/${id}`);
  }

  retrieveContact(id: number) {
    return this.httpClient.get<contact>(`${API_URL}/Contacts/${id}`);
  }

  updateContact(id: number, contact: contact) {
    return this.httpClient.put<number>(`${API_URL}/contacts`, contact);
  }

  savecontact(contact: contact) {
    return this.httpClient.post<number>(`${API_URL}/contacts`, contact);
  }

  getMessage() {
    return this.httpClient.get(`${API_URL}/api`, {
      withCredentials: true,
      responseType: 'text',
    });
  }
}
