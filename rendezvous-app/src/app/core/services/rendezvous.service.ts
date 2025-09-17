import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private apiUrl = 'http://127.0.0.1:8000/api/rendezvous'; // URL backend

  constructor(private http: HttpClient) {}

  // Fonction pour créer un rendez-vous
  createRendezVous(data: any): Observable<any> {
    const token = localStorage.getItem('access_token'); // JWT stocké après login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/create/`, data, { headers });
  }

  // Nouvelle fonction pour récupérer tous les rendez-vous de l'utilisateur courant
  getRendezVous(): Observable<any[]> {
    const token = localStorage.getItem('access_token'); // JWT stocké après login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
