import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  encodedData: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(private scanner: BarcodeScanner) {
    this.encodedData = 'Programming isnt about what you know';
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanBRcode() {
    this.scanner.scan().then(res => {
        this.scannedBarCode = res;
      }).catch(err => {
        alert(err);
      });
  }

  ngOnInit() {
  }

}
