import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.router.url == '/login' || this.router.url == '/main-page') {
        if(this.router.url == '/main-page'){
          this.router.navigate(['main-page']);
        }
        this.presentAlertConfirm();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['main-page']);
        } else {
          this.router.navigate(['login']);
        }
      });
 
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: async () => {
            App.exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
