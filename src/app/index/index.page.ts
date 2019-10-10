import { Component, OnInit } from '@angular/core';
import { CreategameService } from '../creategame.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    const loading = this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.loginForm.valid) {
        this.email = this.loginForm.value['email'];
        if (this.email != null && this.email.trim() != "") {
          this.gameService.creategame(this.email).subscribe(
            (response: any) => {
              this.game = response;
              a.dismiss();
              localStorage.setItem("idGame", this.game.id);
              localStorage.setItem("userName", this.email);
              this.router.navigate(['/battle']);
            }, (error) => {
              a.dismiss();
              console.error(error);
              this.showErrorAlertException(error);
            })
        } else {
          a.dismiss();
          this.showErrorAlert('Ingresa tu correo por fa!');
        }
      } else {
        a.dismiss();
        this.showErrorAlert('Ingresa tu correo por fa!');
      }
    });
  }

  showErrorAlert(message: string) {
    this.alertController.create({
      header: 'Heyyy',
      message: message,
      buttons: ['Ok va!!']
    }).then(alert => {
      alert.present();
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

  ngOnInit() {
  }

}
