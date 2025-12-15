import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AddressBook, SearchFilter } from '../../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<AddressBook[]> {
    return this.apiService.get<AddressBook[]>('AddressBooks');
  }

  getById(id: number): Observable<AddressBook> {
    return this.apiService.get<AddressBook>(`AddressBooks/${id}`);
  }

  create(addressBook: AddressBook): Observable<AddressBook> {
    return this.apiService.post<AddressBook>('AddressBooks', addressBook);
  }

  update(id: number, addressBook: AddressBook): Observable<AddressBook> {
    return this.apiService.put<AddressBook>(`AddressBooks/${id}`, addressBook);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`AddressBooks/${id}`);
  }

  search(filter: SearchFilter): Observable<AddressBook[]> {
    return this.apiService.post<AddressBook[]>('AddressBooks/search', filter);
  }

  exportToExcel(): Observable<Blob> {
    // Note: This would need to be implemented in ApiService with proper blob handling
    // For now, using ExportService in component instead
    return this.apiService.get<Blob>('AddressBooks/export');
  }
}

