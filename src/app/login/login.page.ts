import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class LoginPage implements OnInit {

  private db = firebase.firestore();

  user = {
    email:'',
    password:''
  }
  
  constructor(private authService: AuthenticationService, private router: Router, public toastController: ToastController) {}

  ngOnInit() { }

  async login(form: NgForm){
    var usersCollection = this.db.collection("users");
    var query = usersCollection.where("email", "==", form.value.email);
    query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var hashed_password = CryptoJS.SHA1(form.value.password).toString();
          if(doc.data()['password'] == hashed_password){
            this.authService.login(doc.id);
          }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
    .finally(async () => {
      if(this.authService.isAuthenticated()){
        const toast = await this.toastController.create({
          message: 'Successfully logged in',
          duration: 2000,
          color:'success'
        });
        toast.present();
        this.router.navigate(['main-page']);

        // clear login form
        this.user.email = '';
        this.user.password = '';
      }
      else{
        const toast = await this.toastController.create({
          message: 'Incorrect Email / Password',
          duration: 2000,
          color:'danger'
        });
        toast.present();
      }
    });
  }
}
