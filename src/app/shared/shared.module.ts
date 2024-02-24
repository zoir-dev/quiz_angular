import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { material_imports } from './material-imports';


@NgModule({
  imports: [ CommonModule, ...material_imports, RouterModule],
  declarations: [PageNotFoundComponent,],

  exports: [

    CommonModule,
    PageNotFoundComponent,



  ]
})

export class SharedModule { }
