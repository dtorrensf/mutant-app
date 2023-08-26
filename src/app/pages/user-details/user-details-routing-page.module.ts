import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsPageComponent } from './user-details-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserDetailsPageComponent,
    children: []
  }
];

/**
 * UserDetailsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingPageModule {}
