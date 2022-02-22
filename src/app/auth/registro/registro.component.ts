import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isLogged: boolean = false;  
  nuevoUsuario: any;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsg!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(data => {
      this.toastr.success('Registro exitoso', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});

      this.router.navigate(['/login']);
    }, err => {      
      this.errMsg = err.error.mensaje;
      this.toastr.error(this.errMsg, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'});
    })
  }
}
