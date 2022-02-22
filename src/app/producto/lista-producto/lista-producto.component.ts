import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  isAdmin: boolean = false;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService
    ) { }

  cargarProductos(): void {
    this.productoService.lista().subscribe(data => {
      this.productos = data;
    }, err => {
      console.log('error: ',err.status);
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }
  
  borrar(id: number) {
    if(window.confirm('Estas seguro de borrar el producto ' + id)) {
      this.productoService.borrar(id).subscribe(data => {
        this.toastr.success('Producto Eliminado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarProductos();
      }, err => {
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'}); 
      });
    }    
  }
}
