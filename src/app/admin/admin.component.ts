// import { BreakpointObserver } from '@angular/cdk/layout';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { Router } from '@angular/router';
// import { AuthService } from '../public/auth/auth.service';
// // import { AccountService } from '../core/account.service';
//
// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.scss'],
// })
// export class AdminComponent implements OnInit {
//   url!: null;
//   sshowFiller = false;
//   @ViewChild(MatSidenav)
//   sidenav!: MatSidenav;
//
//   constructor(
//     //  private accountService: AccountService,
//     private observer: BreakpointObserver,
//     private router: Router,
//     private authService: AuthService
//   ) {}
//
//   ngOnInit(): void {
//     this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
//       if (res.matches) {
//         this.sidenav.mode = 'over';
//         this.sidenav.close();
//       } else {
//         this.sidenav.mode = 'side';
//         this.sidenav.open();
//       }
//     });
//   }
//
//
// }



import {  BreakpointObserver } from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../public/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  url: string = '/default';
  showFiller = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  route(){
    this.router.navigate(['/'])
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches && this.sidenav) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else if (this.sidenav) {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }

      // Manually trigger change detection
      this.cdr.detectChanges();
    });
  }
}
