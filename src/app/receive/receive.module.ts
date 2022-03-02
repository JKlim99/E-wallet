import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivePageRoutingModule } from './receive-routing.module';

import { ReceivePage } from './receive.page';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivePageRoutingModule,
    QRCodeModule
  ],
  declarations: [ReceivePage]
})
export class ReceivePageModule {}
