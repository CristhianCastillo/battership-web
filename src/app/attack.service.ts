import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(
    private http: HttpClient
  ) { }

  attack(id: string, username: string, x: number, y: number) {
    return this.http.get('http://165.22.229.164:8199/battlefield/attack?idGame=' + id +
      '&username=' + username + '&x=' + x + '&y=' + y);
  }
}
