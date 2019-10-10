import { Component, OnInit } from '@angular/core';
import { CreatebattlefieldService } from '../createbattlefield.service';
import { Field } from '../models/field';
import { Table } from '../models/table';


@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent implements OnInit {

  public listFiels: Field[];
  public listTableMy: Table[];
  public listTableEnemy: Table[];
  public rowTemp = -1;

  public sended: boolean;
  public anotherPlayerReady: boolean;

  constructor(
    public service: CreatebattlefieldService
  ) { }



  ngOnInit() {
    this.service.getTableGame().subscribe((response: any) => {
      this.listFiels = response;
      let table: Table;
      this.listTableMy = new Array();
      for (let i = 0; i < this.listFiels.length; i++) {
        let fieldTemp: Field = this.listFiels[i];
        if (this.rowTemp != fieldTemp.x) {
          this.rowTemp = fieldTemp.x;
          if (i > 0) {
            this.listTableMy.push(table);
          }
          table = new Table();
          table.row = fieldTemp.x;
          table.fields = new Array();
          table.fields.push(fieldTemp);
        } else {
          table.fields.push(fieldTemp);
        }
      }
      this.listTableMy.push(table);
      this.listTableEnemy = this.listTableMy;
    }, (error) => {
      console.error(error);
    });
  }

  selectPoint(field: Field) {
    console.log("select: " + field.x + " plass: " + field.y);
    let table = this.listTableMy[field.x];
    let element = table.fields[field.y];
    element.ship = !element.ship;
    table.fields[field.y] = element;
    this.listTableMy[field.x] = table;
  }

  attack(field: Field) {
    console.log("select: " + field.x + " plass: " + field.y);

    //Yes Match
    let table = this.listTableEnemy[field.x];
    let element = table.fields[field.y];
    element.ship = !element.ship;
    table.fields[field.y] = element;
    this.listTableEnemy[field.x] = table;
  }


  terminateTable() {
    let fieldsTotal = new Array();
    for (let i = 0; i < this.listTableMy.length; i++) {
      let fieldsTemp = this.listTableMy[i].fields;
      for (let j = 0; j < fieldsTemp.length; j++) {
        fieldsTotal.push(fieldsTemp[j]);
      }
    }

    const idGame = localStorage.getItem("idGame");
    const userName = localStorage.getItem("userName");
    this.service.createBattle(idGame, userName, fieldsTotal).subscribe((response: any) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });
  }
}
