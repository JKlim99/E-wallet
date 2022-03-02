import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-topup-success',
  templateUrl: './topup-success.page.html',
  styleUrls: ['./topup-success.page.scss'],
})
export class TopupSuccessPage implements OnInit {

  private loading = true;

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true;
    setTimeout( async () => {
      this.loading = false;
      const toast = await this.toastController.create({
        message: 'Topup successful',
        duration: 2000,
        color:'success'
      });
      toast.present();
      setTimeout( () => {
        this.router.navigate(['main-page']);
      }, 500);
    }, 1000);
  }
}
