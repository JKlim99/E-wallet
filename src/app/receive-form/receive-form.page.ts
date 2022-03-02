import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-receive-form',
  templateUrl: './receive-form.page.html',
  styleUrls: ['./receive-form.page.scss'],
})
export class ReceiveFormPage implements OnInit {

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async requestMoney(form: NgForm){
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
    let navigationExtras: NavigationExtras = {
      state: {
        amount: amount
      }
    };
    this.router.navigate(['receive'], navigationExtras);
  }
}
