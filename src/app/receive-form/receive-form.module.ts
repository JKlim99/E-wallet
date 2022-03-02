import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveFormPageRoutingModule } from './receive-form-routing.module';

import { ReceiveFormPage } from './receive-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveFormPageRoutingModule
  ],
  declarations: [ReceiveFormPage]
})
export class ReceiveFormPageModule {}
