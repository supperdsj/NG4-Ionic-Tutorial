import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the LifeCyclePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-life-cycle',
  templateUrl: 'life-cycle.html',
})
export class LifeCyclePage {
  inputValue: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnChanges() {
    console.log(`ngOnChanges`);
  }

  ngOnInit() {
    console.log(`ngOnInit`);
  }

  ngDoCheck() {
    console.log(`ngDoCheck`);
  }

  ngAfterContentChecked() {
    console.log(`ngAfterContentChecked`);
  }

  ngAfterContentInit() {
    console.log(`ngAfterContentInit`);
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit`);
  }

  ngAfterViewChecked() {
    console.log(`ngAfterViewChecked`);
  }

  ngOnDestroy() {
    console.log(`ngOnDestroy`);
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    const rnd = Math.random();
    console.log(`ionViewCanEnter ${rnd}`);
    return rnd > 0.5;
  }

  ionViewDidLoad() {
    console.log(`ionViewDidLoad`);
  }

  ionViewWillEnter() {
    console.log(`ionViewWillEnter`);
  }

  ionViewCanLeave(): boolean | Promise<boolean> {
    console.log(`ionViewCanLeave wait`);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`ionViewCanLeave true`);
        resolve(true)
      }, 5000);
    });
    return promise;
  }
  ionViewWillLeave(){
    console.log(`ionViewWillLeave`);
  }
  ionViewDidLeave(){
    console.log(`ionViewDidLeave`);
  }
  ionViewWillUnload(){
    console.log(`ionViewWillUnload`);
  }
}
