import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './Guards/auth-guard.guard';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';

const routes: Routes = [

  { path: '', component: AppComponent },
  { path: 'Admin', loadChildren: () => import('src/app/features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'Auth', loadChildren: () => import('src/app/features/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'shared', loadChildren: () => import('src/app/shared/shared.module').then(m => m.SharedModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
