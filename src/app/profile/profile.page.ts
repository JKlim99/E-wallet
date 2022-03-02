import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private db = firebase.firestore();

  user = {
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    confirm_password:''
  }

  constructor(private authService: AuthenticationService, private router: Router, public toastController: ToastController, public alertController: AlertController, private storage: Storage) {
    var usersCollection = this.db.collection("users");
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        var query = usersCollection.doc(res);
        query.get()
        .then((res) => {
          this.user.first_name = res.data()['first_name'];
          this.user.last_name = res.data()['last_name'];
          this.user.email = res.data()['email'];
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
    });
  }

  ngOnInit() {
  }

  async update(form: NgForm){
    if(!form.valid){
      const toast = await this.toastController.create({
        message: 'Please fill in all fields',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }

    if(form.value.password != form.value.confirm_password){
      const toast = await this.toastController.create({
        message: 'Password and Confirm Password must be same',
        duration: 2000,
        color:'danger'
      });
      toast.present();
      return;
    }
    
    const toast = await this.toastController.create({
      message: 'Profile successfully updated',
      duration: 2000,
      color:'success'
    });
    toast.present();

    var usersCollection = this.db.collection("users");
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        if(form.value.password == ''){
          usersCollection.doc(res).update({
            first_name: form.value.first_name,
            last_name: form.value.last_name
          })
          .then((docRef) => {
            this.router.navigate(['main-page']);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        }
        else{
          usersCollection.doc(res).update({
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            password: CryptoJS.SHA1(form.value.password).toString()
          })
          .then((docRef) => {
            this.router.navigate(['main-page']);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        }
      }
    });
  }

  async logout(){
    this.authService.logout();
    const toast = await this.toastController.create({
      message: 'Successfully logged out',
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.router.navigate(['/login']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: async () => {
            this.authService.logout();
            const toast = await this.toastController.create({
              message: 'Successfully logged out',
              duration: 2000,
              color:'success'
            });
            toast.present();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
