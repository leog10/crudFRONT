import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
      this.isLogged = this.tokenService.isLogged();
      this.isAdmin = this.tokenService.isAdmin();
  }

  onLogout(): void {
    this.tokenService.logOut();
  }
}
