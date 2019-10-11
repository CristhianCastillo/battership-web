import { Component, OnInit } from '@angular/core';
import { CreatebattlefieldService } from '../createbattlefield.service';
import { Field } from '../models/field';
import { Table } from '../models/table';
import { AlertController, LoadingController } from '@ionic/angular';
import { AttackService } from '../attack.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent implements OnInit {

  public listFielsMy: Field[];
  public listFielsEnemy: Field[];
  public listTableMy: Table[];
  public listTableEnemy: Table[];

  public userName: string;
  public idGame: string;
  public readyToPlay: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
    public service: CreatebattlefieldService, public alertController: AlertController, public serviceAttack: AttackService, public loadingCtrl: LoadingController
  ) {
    this.readyToPlay = false;
    this.userName = "NO ASIGNADO";
    this.idGame = "NO ASIGNADA";
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idGame = this.router.getCurrentNavigation().extras.state.idGame;
        this.userName = this.router.getCurrentNavigation().extras.state.userName;
      }
    });
  }

  ngOnInit() {
    this.service.getTableGame().subscribe((response: any) => {
      if (response.message === "OK") {
        this.listFielsMy = response.result;
        this.listTableMy = this.generateTable(this.listFielsMy);
      } else {
        this.showErrorAlertException(response.result);
      }
    }, (error) => {
      this.showErrorAlertException(error.message);
    });
  }


  generateTable(list: any) {
    let rowTemp = -1;
    let table: Table;
    let listTable = new Array();
    for (let i = 0; i < list.length; i++) {
      let fieldTemp: Field = list[i];
      fieldTemp.clicked = false;
      if (rowTemp != fieldTemp.x) {
        rowTemp = fieldTemp.x;
        if (i > 0) {
          listTable.push(table);
        }
        table = new Table();
        table.row = fieldTemp.x;
        table.fields = new Array();
        table.fields.push(fieldTemp);
      } else {
        table.fields.push(fieldTemp);
      }
    }
    listTable.push(table);
    return listTable;
  }

  selectPoint(field: Field) {
    if (!this.readyToPlay) {
      let table = this.listTableMy[field.x];
      let element = table.fields[field.y];
      element.ship = !element.ship;
      table.fields[field.y] = element;
      this.listTableMy[field.x] = table;
    }
  }

  attack(field: Field) {
    if (this.readyToPlay) {
      this.loadingCtrl.create({
        message: "Enviando disparo..."
      }).then(a => {
        a.present();
        this.serviceAttack.attack(this.idGame, this.userName, field.x, field.y).subscribe((response: any) => {
          a.dismiss();
          if (response.message === "OK") {
            let result = response.result;
            if (result.impact) {
              let table = this.listTableEnemy[field.x];
              let element = table.fields[field.y];
              element.ship = !element.ship;
              table.fields[field.y] = element;
              this.listTableEnemy[field.x] = table;
            } else {
              let table = this.listTableEnemy[field.x];
              let element = table.fields[field.y];
              element.clicked = true;
              table.fields[field.y] = element;
              this.listTableEnemy[field.x] = table;
            }
            if (result.win) {
              this.showAlertMessage(this.userName + " ganaste!!!");
            }
          } else {
            this.showErrorAlertException(response.result);
          }
        }, (error) => {
          a.dismiss();
          this.showErrorAlertException(error.message);
        });

      });
    }
  }

  sendTablePosition() {
    this.loadingCtrl.create({
      message: "Cargando partida..."
    }).then(a => {
      a.present();
      let fieldsTotal = new Array();
      for (let i = 0; i < this.listTableMy.length; i++) {
        let fieldsTemp = this.listTableMy[i].fields;
        for (let j = 0; j < fieldsTemp.length; j++) {
          fieldsTotal.push(fieldsTemp[j]);
        }
      }

      this.service.createBattle(this.idGame, this.userName, fieldsTotal).subscribe((response: any) => {
        if (response.message === "OK") {
          let message = "¡Muy bien " + this.userName + " ataquemos!";
          this.service.getTableGame().subscribe((response: any) => {
            a.dismiss();
            if (response.message === "OK") {
              this.listFielsEnemy = response.result;
              this.listTableEnemy = this.generateTable(this.listFielsEnemy);
              this.readyToPlay = true;
              this.showAlertMessage(message);
            } else {
              this.showErrorAlertException(response.result);
            }
          }, (error) => {
            a.dismiss();
            this.showErrorAlertException(error.message);
          });
        } else {
          a.dismiss();
          this.showErrorAlertException(response.result);
        }
      }, (error) => {
        a.dismiss();
        this.showErrorAlertException(error.message);
      });
    });
  }

  showErrorAlertException(message: string) {
    this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  showAlertMessage(message: string) {
    this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }
}
