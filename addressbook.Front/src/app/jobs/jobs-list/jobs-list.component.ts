import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../models/address-book.model';

@Component({
  selector: 'app-jobs-list',
  standalone: false,
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css'
})
export class JobsListComponent implements OnInit {
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  showEditModal: boolean = false;
  isLoading: boolean = false;
  jobTitle: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getAll().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.isLoading = false;
      }
    });
  }

  onAdd(): void {
    this.selectedJob = { jobTitle: '' } as Job;
    this.jobTitle = '';
    this.showEditModal = true;
  }

  onEdit(job: Job): void {
    this.selectedJob = { ...job };
    this.jobTitle = job.jobTitle;
    this.showEditModal = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.delete(id).subscribe({
        next: () => {
          this.loadJobs();
        },
        error: (error) => {
          console.error('Error deleting job:', error);
          alert('Error deleting job');
        }
      });
    }
  }

  onSave(): void {
    if (!this.jobTitle.trim()) {
      alert('Job title is required');
      return;
    }

    const jobData: Job = {
      id: this.selectedJob?.id,
      jobTitle: this.jobTitle.trim()
    };

    if (this.selectedJob?.id) {
      // Update
      this.jobService.update(this.selectedJob.id, jobData).subscribe({
        next: () => {
          this.loadJobs();
          this.onClose();
        },
        error: (error) => {
          console.error('Error updating job:', error);
          alert('Error updating job');
        }
      });
    } else {
      // Create
      this.jobService.create(jobData).subscribe({
        next: () => {
          this.loadJobs();
          this.onClose();
        },
        error: (error) => {
          console.error('Error creating job:', error);
          alert('Error creating job');
        }
      });
    }
  }

  onClose(): void {
    this.showEditModal = false;
    this.selectedJob = null;
    this.jobTitle = '';
  }
}

