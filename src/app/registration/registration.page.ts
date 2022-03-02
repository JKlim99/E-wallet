import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  private db = firebase.firestore();

  user = {
    first_name:'',
    last_name:'',
    email:'',
    password:''
  }

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async register(form: NgForm){
    if(!form.valid){
      const toast = await this.toastController.create({
        message: 'Please fill in all fields',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }
    var email_exists = false;

    var usersCollection = this.db.collection("users");
    var query = usersCollection.where("email", "==", form.value.email);
    query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach(() => {
          email_exists = true;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
    .finally(async ()=>{
      if(!email_exists){
        const toast = await this.toastController.create({
          message: 'Successfully registered',
          duration: 2000,
          color:'success'
        });
        toast.present();
  
        var usersCollection = this.db.collection("users");
        usersCollection.add({
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          email: form.value.email,
          password: CryptoJS.SHA1(form.value.password).toString()
        })
        .then((docRef) => {
          this.router.navigate(['login']);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        
      }
      else{
        const toast = await this.toastController.create({
          message: 'Email exists',
          duration: 2000,
          color:'danger'
        });
        toast.present();
      }
    });
  }

}
