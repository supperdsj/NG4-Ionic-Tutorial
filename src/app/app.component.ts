import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import firebase from 'firebase';
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  tabsPage = TabsPage;
  signUpPage = SignupPage;
  signInPage = SigninPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyC0sRRSnSQfTI-nnIQUfHBzG4R2_2oXPmE",
      authDomain: "ionic-recipebook-3a0ba.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isAuthenticated = true;
        // this.nav.setRoot(this.tabsPage);
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
        // this.nav.setRoot(this.signInPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

  onLoad(page: any) {
    // this.nav.setRoot(page);
    this.rootPage = page;
    this.menuCtrl.close();
  }
}

