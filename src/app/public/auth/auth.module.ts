

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtModule } from '@auth0/angular-jwt';
import { AccessComponent } from './access/access.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { material_imports } from 'src/app/shared/material-imports';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccessComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    JwtModule,
    ...material_imports
  ],
})
export class AuthModule { }
