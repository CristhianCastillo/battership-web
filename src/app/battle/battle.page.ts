import { Component, OnInit } from '@angular/core';
import { AttackService } from '../attack.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit {

  field: any = null;
  id: number;
  email: string = " ";
  x: number;
  y: number;

  constructor(
    public attackService: AttackService
  ) { }
  
  attack(){
    if (this.id != null && this.email != null && this.x != null && this.y != null ){
      this.attackService.attack(this.id, this.email, this.x, this.y).subscribe(
         (data) => {
           this.field = data;
           console.log(this.field);
         }, (error) => {
           console.error(error);
         } 
      )
    }
  }
  ngOnInit() {}

}
