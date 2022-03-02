import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async paymentPage(form: NgForm){
    if(!form.valid){
      const toast = await this.toastController.create({
        message: 'Please fill in an amount',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }
    var amount = form.value.amount;
    if(form.value.amount < 10){
      const toast = await this.toastController.create({
        message: 'Min topup amount is RM10',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }
    let navigationExtras: NavigationExtras = {
      state: {
        amount: amount
      }
    };
    this.router.navigate(['stripe'], navigationExtras);
  }

}
