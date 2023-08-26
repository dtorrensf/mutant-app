import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { UserDetailsPageComponent } from './user-details-page.component';
import { UserDetailsRoutingPageModule } from './user-details-routing-page.module';

/**
 * UserDetailsPageModule
 */
@NgModule({
  declarations: [UserDetailsPageComponent],
  imports: [CommonModule, UserDetailsRoutingPageModule]
})
export class UserDetailsPageModule {}
