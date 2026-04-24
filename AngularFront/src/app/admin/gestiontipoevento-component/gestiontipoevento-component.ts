import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-gestiontipoevento-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestiontipoevento-component.html',
  styleUrl: './gestiontipoevento-component.css'
})
export class GestiontipoeventoComponent implements OnInit {
  tipos: any[] = [];
  tipoEdicion: any = null;
  mostrarFormulario: boolean = false;
  esNuevo: boolean = false;

  constructor(
    private tipoService: TipoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    this.tipoService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error al cargar las categorías", err) // Solucionado el 'any'
    });
  }

  abrirFormularioNuevo() {
    this.esNuevo = true;
    this.tipoEdicion = { nombre: '', descripcion: '' };
    this.mostrarFormulario = true;
    this.cdr.detectChanges();
  }

  abrirFormularioEditar(tipo: any) {
    this.esNuevo = false;
    this.tipoEdicion = { ...tipo };
    this.mostrarFormulario = true;
    this.cdr.detectChanges();
  }

  guardarTipo() {
    if (this.esNuevo) {
      this.tipoService.crearTipo(this.tipoEdicion).subscribe({
        next: () => {
          alert(' ¡Nueva categoría creada con éxito!');
          this.mostrarFormulario = false;
          this.cargarTipos();
        },
        error: (err: any) => { // Solucionado el 'any'
          console.error(err);
          alert(' Error al crear la categoría. Revisa la consola.');
        }
      });
    } else {
      this.tipoService.editarTipo(this.tipoEdicion).subscribe({
        next: () => {
          alert(' Descripción actualizada correctamente');
          this.mostrarFormulario = false;
          this.cargarTipos();
        },
        error: (err: any) => { // Solucionado el 'any'
          console.error(err);
          alert(' Error al actualizar la categoría.');
        }
      });
    }
  }
}
