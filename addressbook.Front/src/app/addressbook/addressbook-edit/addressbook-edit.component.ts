import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressBook, Job, Department } from '../../models/address-book.model';
import { CustomValidators } from '../../core/validators/custom.validators';
import { AddressBookService } from '../../core/services/address-book.service';

@Component({
  selector: 'app-addressbook-edit',
  standalone: false,
  templateUrl: './addressbook-edit.component.html',
  styleUrl: './addressbook-edit.component.css'
})
export class AddressBookEditComponent implements OnInit {
  @Input() entry: AddressBook | null = null;
  @Input() jobs: Job[] = [];
  @Input() departments: Department[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  editForm: FormGroup;
  selectedFile: File | null = null;
  photoPreview: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addressBookService: AddressBookService
  ) {
    this.editForm = this.fb.group({
      fullName: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, CustomValidators.phoneValidator()]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.emailValidator()]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]]
    });
  }

  ngOnInit(): void {
    if (this.entry && this.entry.id) {
      // Edit mode
      const dob = this.entry.dateOfBirth instanceof Date 
        ? this.entry.dateOfBirth.toISOString().split('T')[0]
        : this.entry.dateOfBirth;
      
      this.editForm.patchValue({
        fullName: this.entry.fullName,
        jobId: this.entry.jobId,
        departmentId: this.entry.departmentId,
        mobileNumber: this.entry.mobileNumber,
        dateOfBirth: dob,
        address: this.entry.address,
        email: this.entry.email,
        age: this.entry.age
      });

      if (this.entry.photoPath) {
        this.photoPreview = this.entry.photoPath;
      }
    }

    // Calculate age when date of birth changes
    this.editForm.get('dateOfBirth')?.valueChanges.subscribe(() => {
      this.calculateAge();
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  calculateAge(): void {
    const dob = this.editForm.get('dateOfBirth')?.value;
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.editForm.patchValue({ age }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isLoading = true;
      const formValue = this.editForm.value;
      
      // If a new file is selected, you would need to upload it first to get the photoPath
      // For now, we'll keep the existing photoPath or handle file upload separately
      const addressBookData: AddressBook = {
        ...formValue,
        photoPath: this.entry?.photoPath, // Keep existing photoPath, file upload should be handled separately
        dateOfBirth: formValue.dateOfBirth
      };
      
      // TODO: If selectedFile exists, upload it first to get photoPath
      // Then update addressBookData.photoPath with the returned path

      if (this.entry?.id) {
        // Update
        this.addressBookService.update(this.entry.id, addressBookData).subscribe({
          next: () => {
            this.isLoading = false;
            this.save.emit();
          },
          error: (error) => {
            console.error('Error updating entry:', error);
            alert('Error updating entry');
            this.isLoading = false;
          }
        });
      } else {
        // Create
        this.addressBookService.create(addressBookData).subscribe({
          next: () => {
            this.isLoading = false;
            this.save.emit();
          },
          error: (error) => {
            console.error('Error creating entry:', error);
            alert('Error creating entry');
            this.isLoading = false;
          }
        });
      }
    }
  }

  onClose(): void {
    this.close.emit();
  }
}

