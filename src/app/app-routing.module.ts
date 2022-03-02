import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'main-page',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'balance',
    canActivate: [AuthGuard],
    loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'send',
    canActivate: [AuthGuard],
    loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
  },
  {
    path: 'receive',
    canActivate: [AuthGuard],
    loadChildren: () => import('./receive/receive.module').then( m => m.ReceivePageModule)
  },
  {
    path: 'topup',
    canActivate: [AuthGuard],
    loadChildren: () => import('./topup/topup.module').then( m => m.TopupPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'stripe',
    loadChildren: () => import('./stripe/stripe.module').then( m => m.StripePageModule)
  },
  {
    path: 'topup-success',
    loadChildren: () => import('./topup-success/topup-success.module').then( m => m.TopupSuccessPageModule)
  },
  {
    path: 'receive-form',
    loadChildren: () => import('./receive-form/receive-form.module').then( m => m.ReceiveFormPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
