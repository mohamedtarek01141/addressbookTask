export interface AddressBook {
  id?: number;
  fullName: string;
  jobId: number;
  jobTitle?: string;
  departmentId: number;
  departmentName?: string;
  mobileNumber: string;
  dateOfBirth: Date | string;
  address: string;
  email: string;
  photoPath?: string;
  age: number;
}

export interface Job {
  id?: number;
  jobTitle: string;
}

export interface Department {
  id?: number;
  name: string;
}

export interface User {
  id?: number;
  username: string;
  password?: string;
  token?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SearchFilter {
  fullName?: string;
  jobId?: number;
  departmentId?: number;
  mobileNumber?: string;
  email?: string;
  address?: string;
  dateOfBirthFrom?: Date | string;
  dateOfBirthTo?: Date | string;
}

