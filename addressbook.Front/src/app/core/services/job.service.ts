import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Job } from '../../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Job[]> {
    return this.apiService.get<Job[]>('jobs');
  }

  getById(id: number): Observable<Job> {
    return this.apiService.get<Job>(`jobs/${id}`);
  }

  create(job: Job): Observable<Job> {
    return this.apiService.post<Job>('jobs', job);
  }

  update(id: number, job: Job): Observable<Job> {
    return this.apiService.put<Job>(`jobs/${id}`, job);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`jobs/${id}`);
  }
}

