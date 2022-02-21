import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto | undefined;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detalleId(id).subscribe(data => {
      this.producto = data;
    }, err => {
      this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.router.navigate(['/']);
    })    
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.actualizar(this.producto!, id).subscribe(() => {
      this.toastr.success('Producto Actualizado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.router.navigate(['/']);
    }, err => {
      this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'});
    });    
  }

}
