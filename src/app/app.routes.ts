import { Routes } from '@angular/router';
import { MainlayoutComponent } from './mainlayout.component/mainlayout.component';
import { CategoriaListComponent } from './categoria-list.component/categoria-list.component';
import { CategoriaFormComponent } from './categoria-form.component/categoria-form.component';

export const routes: Routes = [
  { path: 'main', component: MainlayoutComponent, children: [
    { path: 'list', component: CategoriaListComponent },
    { path: 'create', component: CategoriaFormComponent },
    { path: 'edit/:id', component: CategoriaFormComponent },
  ]},
  { path: '**', redirectTo: 'main' }];