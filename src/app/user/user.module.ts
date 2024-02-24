import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { material_imports } from '../shared/material-imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './component/test/test.component';
import { StartComponent } from './component/start/start.component';

@NgModule({
  declarations: [
    UserComponent,
    TestComponent,
    StartComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...material_imports
  ]
})
export class UserModule { }
