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
  email: string;
  password?: string;
  token?: string;
}

export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  userName: string;
  email: string;
}

export interface SearchFilter {
  searchTerm?: string;
  startDate?: Date | string;
  endDate?: Date | string;
}

