import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Department } from '../../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Department[]> {
    return this.apiService.get<Department[]>('departments');
  }

  getById(id: number): Observable<Department> {
    return this.apiService.get<Department>(`departments/${id}`);
  }

  create(department: Department): Observable<Department> {
    return this.apiService.post<Department>('departments', department);
  }

  update(id: number, department: Department): Observable<Department> {
    return this.apiService.put<Department>(`departments/${id}`, department);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`departments/${id}`);
  }
}

