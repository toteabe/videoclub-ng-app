import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Categoria } from '../model/categoria.interface';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ROUTES } from '../app.routes';

@Component({
  selector: 'app-categoria-list',
  imports: [DatePipe],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss',
  standalone: true
})
export class CategoriaListComponent  {
  private cdr = inject(ChangeDetectorRef);
  categoriaService = inject(CategoriaService);
  router = inject(Router);
  categorias: Categoria[] = [];

ngOnInit() {
  this.categoriaService
    .getAll()
    .subscribe((data) => {
      this.categorias = data;
      //Actualizo la vista propiedad clásica de modelo del componente en aplicación zoneless 
      // y para reflejar el cambio en el data-bound
      this.cdr.markForCheck();
    });
}

goToCreate() {
  this.router.navigate([ROUTES.MAIN, ROUTES.CREATE]);
}

edit(id: string) {
  this.router.navigate([ROUTES.MAIN, ROUTES.EDIT, id]);
}

delete(id: string) {
  if (confirm('¿Quieres borrar esta categoria?')) {
    this.categoriaService.delete(id).subscribe(() => {
      this.categorias = this.categorias.filter((cat) => cat.id !== id);
      //Actualizo la vista propiedad clásica de modelo del componente en aplicación zoneless 
      // y para reflejar el cambio en el data-bound
      this.cdr.markForCheck();
    });
  }
}
}
