import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloglistRoutingModule } from './bloglist-routing.module';

import { material_imports } from '../shared/material-imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BloglistComponent} from "./bloglist.component";


@NgModule({
  declarations: [
    BloglistComponent
  ],
  imports: [
    CommonModule,
    BloglistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...material_imports
  ]
})
export class BloglistModule { }
