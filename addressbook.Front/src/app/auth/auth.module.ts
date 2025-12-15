import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthWrapperComponent } from './auth-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent
  }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }

