import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BlogComponent } from './component/blog/blog.component';
import { CategoryComponent } from './component/category/category.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { QuestionAddComponent } from './component/question-add/question-add.component';
import { QuestionListComponent } from './component/question-list/question-list.component';

import { ResultsComponent } from './component/results/results.component';
import { UsersComponent } from './component/users/users.component';
import { ViewCategoryResultsComponent } from './component/view-category-results/view-category-results.component';
import {BloglistComponent} from "./component/bloglist/bloglist.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path:'question-add',
        component: QuestionAddComponent
      },
      {
        path:'question-list',
        component: QuestionListComponent
      },
      {
        path:'new-blog',
        component: BlogComponent
      },
      {
        path:'blog-list',
        component: BloglistComponent,
      },
      {
        path:'users',
        component: UsersComponent
      },
      {
        path:'results',
        component: ResultsComponent
      },
      {
        path:'view-results/:id',
        component: ViewCategoryResultsComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
