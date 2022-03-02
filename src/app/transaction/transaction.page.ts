import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  private db = firebase.firestore();

  transactions = [];
  loading = true;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.transactionList(null);
  }

  transactionList(event){
    this.loading = true;
    this.transactions = [];
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        var transactionsCollection = this.db.collection("transactions");
        var transaction_query = transactionsCollection.where("user_id", "==", res).orderBy("created_at", "desc");
        transaction_query.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.transactions.push(doc.data());
          });
          if(event){
            event.target.complete();
          }
          this.loading = false;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
      }
    });
  }

}
