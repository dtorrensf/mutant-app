import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users-page.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'user-details',
    loadChildren: () =>
      import('./pages/user-details/user-details-page.module').then(
        (m) => m.UserDetailsPageModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
