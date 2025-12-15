import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddressBookService } from '../../core/services/address-book.service';
import { JobService } from '../../core/services/job.service';
import { DepartmentService } from '../../core/services/department.service';
import { ExportService } from '../../core/services/export.service';
import { AddressBook, Job, Department, SearchFilter } from '../../models/address-book.model';

@Component({
  selector: 'app-addressbook-list',
  standalone: false,
  templateUrl: './addressbook-list.component.html',
  styleUrl: './addressbook-list.component.css'
})
export class AddressBookListComponent implements OnInit {
  addressBooks: AddressBook[] = [];
  filteredAddressBooks: AddressBook[] = [];
  jobs: Job[] = [];
  departments: Department[] = [];
  searchFilter: SearchFilter = {};
  isSearchMode: boolean = false;
  isLoading: boolean = false;
  selectedEntry: AddressBook | null = null;
  showEditModal: boolean = false;

  constructor(
    private addressBookService: AddressBookService,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private exportService: ExportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadJobs();
    this.loadDepartments();
  }

  loadData(): void {
    this.isLoading = true;
    this.addressBookService.getAll().subscribe({
      next: (data) => {
        this.addressBooks = data;
        this.filteredAddressBooks = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading address books:', error);
        this.isLoading = false;
      }
    });
  }

  loadJobs(): void {
    this.jobService.getAll().subscribe({
      next: (data) => this.jobs = data,
      error: (error) => console.error('Error loading jobs:', error)
    });
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (data) => this.departments = data,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  onSearch(): void {
    this.isSearchMode = true;
    this.isLoading = true;
    this.addressBookService.search(this.searchFilter).subscribe({
      next: (data) => {
        this.filteredAddressBooks = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching:', error);
        this.isLoading = false;
      }
    });
  }

  onClearSearch(): void {
    this.searchFilter = {};
    this.isSearchMode = false;
    this.filteredAddressBooks = this.addressBooks;
  }

  onAdd(): void {
    this.selectedEntry = {} as AddressBook;
    this.showEditModal = true;
  }

  onEdit(entry: AddressBook): void {
    this.selectedEntry = { ...entry };
    this.showEditModal = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.addressBookService.delete(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting entry:', error);
          alert('Error deleting entry');
        }
      });
    }
  }

  onExport(): void {
    const exportData = this.filteredAddressBooks.map(entry => ({
      'Full Name': entry.fullName,
      'Job Title': entry.jobTitle || '',
      'Department': entry.departmentName || '',
      'Mobile Number': entry.mobileNumber,
      'Date of Birth': entry.dateOfBirth,
      'Address': entry.address,
      'Email': entry.email,
      'Age': entry.age
    }));
    this.exportService.exportToExcel(exportData, 'addressbook');
  }

  onModalClose(): void {
    this.showEditModal = false;
    this.selectedEntry = null;
  }

  onModalSave(): void {
    this.loadData();
    this.onModalClose();
  }

  getJobTitle(id: number): string {
    return this.jobs.find(j => j.id === id)?.jobTitle || '';
  }

  getDepartmentName(id: number): string {
    return this.departments.find(d => d.id === id)?.name || '';
  }
}

