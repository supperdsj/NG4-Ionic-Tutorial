import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onClick(){
    console.log('Clicked!');
  }
  onTap(){
    console.log('Tapped!');
  }
  onPress(){
    console.log('Pressed!');
  }
}
