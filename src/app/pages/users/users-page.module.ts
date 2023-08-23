import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersPageComponent } from './users-page.component';
import { UsersRoutingPageModule } from './users-routing-page.module';

/**
 * UsersPageModule
 */
@NgModule({
  declarations: [UsersPageComponent],
  imports: [CommonModule, UsersRoutingPageModule]
})
export class UsersPageModule {}
