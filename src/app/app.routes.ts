import { Routes } from '@angular/router';
import { MainlayoutComponent } from './mainlayout.component/mainlayout.component';

export const routes: Routes = [
  { path: 'main', component: MainlayoutComponent, children: [
    { path: 'list', loadComponent: () => import('./categoria-list.component/categoria-list.component').then((m) => m.CategoriaListComponent) },
    { path: 'create', loadComponent: () => import('./categoria-form.component/categoria-form.component').then((m) => m.CategoriaFormComponent) },
    { path: 'edit/:id', loadComponent: () => import('./categoria-form.component/categoria-form.component').then((m) => m.CategoriaFormComponent) },
  ]},
  { path: '**', redirectTo: 'main' }];
