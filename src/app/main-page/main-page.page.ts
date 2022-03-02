import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  private db = firebase.firestore();

  user = {
    id: '',
    first_name: '',
    last_name: '',
    balance: 0.00
  };

  transactions = [];

  user_loading = true;
  wallet_loading = true;
  transaction_loading = true;

  constructor(private storage: Storage, private barcodeScanner: BarcodeScanner, public toastController: ToastController, private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.dataInit();
  }

  dataInit() {
    this.user_loading = true;
    this.wallet_loading = true;
    this.transaction_loading = true;

    this.user = {
      id: '',
      first_name: '',
      last_name: '',
      balance: 0.00
    };
  
    this.transactions = [];

    var usersCollection = this.db.collection("users");
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.user.id = res;
        var query = usersCollection.doc(this.user.id);
        query.get()
        .then((res) => {
          this.user.first_name = res.data()['first_name'];
          this.user.last_name = res.data()['last_name'];
          this.user_loading = false;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

        var transactionsCollection = this.db.collection("transactions");
        var transaction_query = transactionsCollection.where("user_id", "==", this.user.id).orderBy("created_at", "desc");
        transaction_query.get()
        .then((querySnapshot) => {
          var i = 0;
          querySnapshot.forEach((doc) => {
            if(i < 3){
              this.transactions.push(doc.data());
            }
            this.user.balance += doc.data()['amount'];
            i++;
          });
          this.wallet_loading = false;
          this.transaction_loading = false;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
      }
    });
  }

  scannedData: any;

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then( async barcodeData => {
      var failed = false;
      let dataArray = barcodeData.text;
      this.scannedData = dataArray.split(";");
      if(this.scannedData.length == 2){
        if(this.user.balance < parseFloat(this.scannedData[1])){
          const toast = await this.toastController.create({
            message: 'Insufficient Balance',
            duration: 2000,
            color:'danger'
          });
          toast.present();
          return;
        }
        this.storage.get(TOKEN_KEY).then(res => {
          if (res) {
            var transactionCollection = this.db.collection("transactions");
            transactionCollection.add({
              type: 'sent',
              amount: -parseFloat(this.scannedData[1]),
              user_id: res,
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
              
            })
            .catch((error) => {
              failed = true;
              console.error("Error adding document: ", error);
            });
            if(!failed){
              transactionCollection.add({
                type: 'request',
                amount: parseFloat(this.scannedData[1]),
                user_id: this.scannedData[0],
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((docRef) => {
                
              })
              .catch((error) => {
                failed = true;
                console.error("Error adding document: ", error);
              });
            }
          }
        });
        if(failed){
          const toast = await this.toastController.create({
            message: 'Invalid QR',
            duration: 2000,
            color:'danger'
          });
          toast.present();
        }
        else{
          const toast = await this.toastController.create({
            message: 'Money sent successfully',
            duration: 2000,
            color:'success'
          });
          toast.present();
          this.dataInit();
        }
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

}
