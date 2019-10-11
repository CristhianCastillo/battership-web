import { Component, OnInit } from '@angular/core';
import { CreategameService } from '../creategame.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public game: any = null;
  public email: string = "";
  public loginForm: FormGroup;
  public isLoading = false;

  constructor(private router: Router,
    public gameService: CreategameService, public loadingCtrl: LoadingController, public alertController: AlertController, private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  createGame() {
    this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.loginForm.valid) {
        this.email = this.loginForm.value['email'];
        if (this.email != null && this.email.trim() != "") {
          this.gameService.creategame(this.email).subscribe(
            (response: any) => {
              a.dismiss();
              if (response.message === "OK") {
                this.game = response;
                let navigationExtras: NavigationExtras = {
                  state: {
                    idGame: this.game.result.id,
                    userName: this.email
                  }
                };
                this.router.navigate(['/battle'], navigationExtras);
              } else {
                this.showErrorAlert(response.result);
              }
            }, (error) => {
              a.dismiss();
              console.error(error.message);
              this.showErrorAlert(error.message);
            });
        } else {
          a.dismiss();
          this.showErrorAlert('Ingresa un correo valido!');
        }
      } else {
        a.dismiss();
        this.showErrorAlert('Ingresa un correo valido!');
      }
    });
  }

  showErrorAlert(message: string) {
    this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  ngOnInit() {
  }

}
