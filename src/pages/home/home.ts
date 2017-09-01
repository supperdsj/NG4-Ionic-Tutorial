import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tapped = 0;
  pressed = 0;

  constructor(public navCtrl: NavController) {

  }

  onDidReset(resetType: string) {
    switch (resetType) {
      case 'all':
        this.tapped = 0;
        this.pressed = 0;
        break;
      case 'tap':
        this.tapped = 0;
        break;
      case 'press':
        this.pressed = 0;
        break;
    }
  }

  onTap() {
    this.tapped++;
  }

  onPress() {
    this.pressed++;
  }

  didWin() {
    return this.tapped === 4 && this.pressed === 2;
  }
}
