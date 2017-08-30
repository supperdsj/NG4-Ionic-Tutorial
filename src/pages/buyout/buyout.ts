import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-buyout',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          BuyoutPage
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <h2>Order</h2>
      <p>Name:{{productData.name}}</p>
      <p>Quantity:{{productData.quantity}}</p>
      <button ion-button="" (click)="onConfirm()">Buy</button>
    </ion-content>
  `
})
export class BuyoutPage {
  productData: { name: string, quantity: number };

  constructor(private navParams: NavParams,private navCtrl:NavController) {
    this.productData = this.navParams.data.productData;
  }
  onConfirm(){
    this.navCtrl.popToRoot();
  }
}
