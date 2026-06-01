import { Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { AddEditPropertyComponent } from './components/add-edit-property/add-edit-property.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'property-list',
    component: PropertyListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'property/:id',
    component: PropertyDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-property',
    component: AddEditPropertyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-property/:id',
    component: AddEditPropertyComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
