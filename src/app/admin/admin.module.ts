import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { material_imports } from '../shared/material-imports';
import { QuestionComponent } from './component/question/question.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExamComponent } from './component/exam/exam.component';
import { CategoryComponent } from './component/category/category.component';
import { QuestionAddComponent } from './component/question-add/question-add.component';
import { QuestionListComponent } from './component/question-list/question-list.component';
import { BlogComponent } from './component/blog/blog.component';
import { UsersComponent } from './component/users/users.component';
import { ResultsComponent } from './component/results/results.component';
import { ViewCategoryResultsComponent } from './component/view-category-results/view-category-results.component';
import {BloglistComponent} from "./component/bloglist/bloglist.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AdminComponent,
    QuestionComponent,
    DashboardComponent,
    ExamComponent,
    CategoryComponent,
    QuestionAddComponent,
    QuestionListComponent,
    BlogComponent,
    UsersComponent,
    ResultsComponent,
    ViewCategoryResultsComponent,
    BloglistComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ...material_imports,
  ]
})
export class AdminModule { }
