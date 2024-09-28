import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; 

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'entertain',
    loadChildren: () =>
      import('./entertainment/entertainment.module').then(
        (m) => m.EntertainmentModule
      ),
    // canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'entertain' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
