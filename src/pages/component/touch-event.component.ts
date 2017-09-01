import {Component} from "@angular/core";

@Component({
  selector:'app-touch-event',
  template:`
  <button ion-button (click)="onClick()">Click me!</button>
  `
})
export class TouchEventComponent{
  onClick(){
    console.log('Clicked!');
  }
}
