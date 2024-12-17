import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookaddPage } from './bookadd.page';

const routes: Routes = [
  {
    path: '',
    component: BookaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookaddPageRoutingModule {}
