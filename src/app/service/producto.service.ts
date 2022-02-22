import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista');
  }

  public detalleId(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detalle/id/${id}`);
  }

  public detalleNombre(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detalle/nombre/${nombre}`);
  }

  public crear(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'crear', producto);
  }

  public actualizar(producto: Producto, id: number): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `actualizar/${id}`, producto);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `borrar/${id}`);
  }
}
