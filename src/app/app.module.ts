import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { QRCodeModule } from 'angular2-qrcode';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAr_US8Ka9H7_o0hBdn0waxuB3IXZDuztk",
  authDomain: "mse-ewallet.firebaseapp.com",
  databaseURL: "https://mse-ewallet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mse-ewallet",
  storageBucket: "mse-ewallet.appspot.com",
  messagingSenderId: "594129570992",
  appId: "1:594129570992:web:ab961ae668b4162cbabf75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, QRCodeModule, FormsModule, IonicStorageModule.forRoot()],
  providers: [BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
