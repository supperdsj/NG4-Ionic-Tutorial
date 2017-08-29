import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-user',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          User {{name}}
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <p>Hi {{name}}</p>
      <button ion-button (click)="onConfirm()">Confirm</button>
      <button ion-button (click)="onHome()">Return to Home</button>
    </ion-content>
  `,
})
export class UserPage {
  name: string;

  constructor(private navParams: NavParams,private navCtrl:NavController) {
    // this.name = navParams.data.userName;
    this.name = navParams.get('userName');
  }
  onConfirm(){
    this.navCtrl.pop();
  }
  onHome(){
    this.navCtrl.popToRoot();
  }
}
