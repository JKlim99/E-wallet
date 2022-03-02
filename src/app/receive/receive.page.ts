import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {

  amount: number = 0.00;
  value:string;

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.amount = this.router.getCurrentNavigation().extras.state.amount;
      }
    });
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.value = res + ";" + this.amount;
        console.log(this.value);
      }
    });    
  }

}
