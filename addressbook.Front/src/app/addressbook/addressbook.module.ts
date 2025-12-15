import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookListComponent } from './addressbook-list/addressbook-list.component';
import { AddressBookEditComponent } from './addressbook-edit/addressbook-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AddressBookListComponent
  }
];

@NgModule({
  declarations: [
    AddressBookListComponent,
    AddressBookEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AddressBookModule { }

