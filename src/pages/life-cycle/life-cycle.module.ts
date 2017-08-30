import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LifeCyclePage } from './life-cycle';

@NgModule({
  declarations: [
    LifeCyclePage,
  ],
  imports: [
    IonicPageModule.forChild(LifeCyclePage),
  ],
})
export class LifeCyclePageModule {}
