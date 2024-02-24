import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  authStatus: boolean = false;
  adminStatus: boolean = false;
  userStatus: boolean = false;

  testStatus=false;
  

  constructor(public authService: AuthService, private locationSt: LocationStrategy) {}


  ngOnInit(): void {
    this.authService.getToken();

    this.authService.getAuthListener().subscribe((data) => {
      this.authStatus = data;
    });

    this.authService.decodedToken().roles.includes('ADMIN')
      ? (this.adminStatus = true)
      : (this.adminStatus = false);

    this.authService.decodedToken().roles.includes('USER')
      ? (this.userStatus = true)
      : (this.userStatus = false);

  }



  logout() {
    this.authService.logout();
    this.authStatus = false;
  }


}
