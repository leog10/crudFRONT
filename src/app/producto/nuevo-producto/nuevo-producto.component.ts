import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre: string = '';
  precio: number = NaN;

  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService, 
    private router: Router
    ) { }  

  ngOnInit(): void {
  }

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.crear(producto).subscribe(() => {
      this.toastr.success('Producto Creado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.router.navigate(['/lista']);
    }, err => {
      this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'});
    });

  }
}
