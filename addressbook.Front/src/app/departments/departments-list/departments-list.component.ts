import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/services/department.service';
import { Department } from '../../models/address-book.model';

@Component({
  selector: 'app-departments-list',
  standalone: false,
  templateUrl: './departments-list.component.html',
  styleUrl: './departments-list.component.css'
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  showEditModal: boolean = false;
  isLoading: boolean = false;
  departmentName: string = '';

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.isLoading = false;
      }
    });
  }

  onAdd(): void {
    this.selectedDepartment = { name: '' } as Department;
    this.departmentName = '';
    this.showEditModal = true;
  }

  onEdit(department: Department): void {
    this.selectedDepartment = { ...department };
    this.departmentName = department.name;
    this.showEditModal = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.delete(id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error deleting department:', error);
          alert('Error deleting department');
        }
      });
    }
  }

  onSave(): void {
    if (!this.departmentName.trim()) {
      alert('Department name is required');
      return;
    }

    const departmentData: Department = {
      id: this.selectedDepartment?.id,
      name: this.departmentName.trim()
    };

    if (this.selectedDepartment?.id) {
      // Update
      this.departmentService.update(this.selectedDepartment.id, departmentData).subscribe({
        next: () => {
          this.loadDepartments();
          this.onClose();
        },
        error: (error) => {
          console.error('Error updating department:', error);
          alert('Error updating department');
        }
      });
    } else {
      // Create
      this.departmentService.create(departmentData).subscribe({
        next: () => {
          this.loadDepartments();
          this.onClose();
        },
        error: (error) => {
          console.error('Error creating department:', error);
          alert('Error creating department');
        }
      });
    }
  }

  onClose(): void {
    this.showEditModal = false;
    this.selectedDepartment = null;
    this.departmentName = '';
  }
}

