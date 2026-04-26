import { Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { AddEditPropertyComponent } from './components/add-edit-property/add-edit-property.component';

export const routes: Routes = [
  {
    path: '',
    component: PropertyListComponent
  },
  {
    path: 'property/:id',
    component: PropertyDetailComponent
  },
  {
    path: 'add-property',
    component: AddEditPropertyComponent
  },
  {
    path: 'edit-property/:id',
    component: AddEditPropertyComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
