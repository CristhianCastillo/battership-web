import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreategameService {

  private httpHeaders = new HttpHeaders({ 'Contet-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  creategame(email: string): Observable<any> {
    return this.http.post<any>('http://165.22.229.164:8199/game/create?username=' + email, null, { headers: this.httpHeaders });
  }
}
