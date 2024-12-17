import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookaddPageRoutingModule } from './bookadd-routing.module';

import { BookaddPage } from './bookadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookaddPageRoutingModule
  ],
  declarations: [BookaddPage]
})
export class BookaddPageModule {}
