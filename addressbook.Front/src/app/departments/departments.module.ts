import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsListComponent } from './departments-list/departments-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsListComponent
  }
];

@NgModule({
  declarations: [DepartmentsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DepartmentsModule { }

