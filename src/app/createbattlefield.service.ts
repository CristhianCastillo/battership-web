import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatebattlefieldService {

  private httpHeaders = new HttpHeaders({ 'Contet-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getTableGame(): Observable<any> {
    return this.http.get<any>('http://165.22.229.164:8199/battlefield/fields', { headers: this.httpHeaders });
  }

  createBattle(id: string, name: string, body: any): Observable<any> {
    return this.http.post<any>('http://165.22.229.164:8199/battlefield/create?idGame=' + id + '&username=' + name, body, { headers: this.httpHeaders });
  }
}
