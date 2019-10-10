import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BattlePage } from './battle.page';
import { BattlefieldComponent } from '../battlefield/battlefield.component';

const routes: Routes = [
  {
    path: '',
    component: BattlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BattlePage,
    BattlefieldComponent]
})
export class BattlePageModule {}
