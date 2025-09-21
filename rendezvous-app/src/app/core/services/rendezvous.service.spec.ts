import { TestBed } from '@angular/core/testing';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {  
  private apiUrl = 'http://localhost:8080/api/rendezvous'; // URL de l'API backend
  constructor(private http: HttpClient) {}
  getRendezVousUtilisateur(): Observable<RendezVous> {
    return this.http.get<any>(this.apiUrl);
  }
}

describe('RendezvousService', () => {
  let service: RendezvousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendezvousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
