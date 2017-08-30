import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UsersPage} from "../users/users";
import {ShopPage} from "../shop/shop";
import {LifeCyclePage} from "../life-cycle/life-cycle";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userPage = UsersPage;
  lifeCyclePage = LifeCyclePage;

  constructor(public navCtrl: NavController) {

  }

  onGoToUsers() {
    this.navCtrl.push(UsersPage);
  }

  onGoToShop() {
    this.navCtrl.push(ShopPage);
  }

  onGoToLifeCycle() {
    this.navCtrl.push(LifeCyclePage, {}, {
      direction: 'back', // default for push is 'forward'
      duration: 2000, // 2 seconds
      easing: 'ease-out'
    })
      .then((msg) => {
        console.log(`goToLifeCycle MSG:${msg}`);
      });
  }
}
