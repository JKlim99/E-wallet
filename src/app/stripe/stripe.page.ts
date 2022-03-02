import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  paymentAmount: number = 10.00;

  cardDetails = {
    number: '',
    expMonth: null,
    expYear: null,
    cvc: ''
  };

  private db = firebase.firestore();

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, public toastController: ToastController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paymentAmount = this.router.getCurrentNavigation().extras.state.amount;
      }
    });
  }

  async payWithStripe(form: NgForm) {
    if(!form.valid){
      const toast = await this.toastController.create({
        message: 'Please fill in all fields',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }
    var number = form.value.number;
    var expMonth = form.value.expMonth;
    var expYear = form.value.expYear;
    var cvc = form.value.cvc;
    
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        var transactionCollection = this.db.collection("transactions");
        transactionCollection.add({
          type: 'topup',
          amount: this.paymentAmount,
          user_id: res,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          this.router.navigate(['topup-success']);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    });
  }
}
