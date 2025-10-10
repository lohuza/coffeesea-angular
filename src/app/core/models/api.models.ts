export interface ValidationFailure {
  propertyName?: string;
  errorMessage?: string;
  attemptedValue?: any;
  customState?: any;
  severity: Severity;
  errorCode?: string;
  formattedMessagePlaceholderValues?: { [key: string]: any };
}

export enum Severity {
  Error = 0,
  Warning = 1,
  Info = 2
}

// Authentication models
export interface SignInRequest {
  companyData: CompanyData;
  contactPersonData: ContactPersonData;
  passwordRequest: PasswordRequest;
}

export interface CompanyData {
  companyName?: string;
  identificationCode?: string;
  address?: string;
}

export interface ContactPersonData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface PasswordRequest {
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

// Company & User models
export interface Company {
  id?: string;
  name?: string;
  companyPersons?: CompanyPerson[];
}

export interface CompanyPerson {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  passwordHash?: string;
  companyId?: string;
  company: Company;
  locations?: Location[];
}

export interface CompanyPersonEditData {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface EditCompanyRequest {
  companyName?: string;
  companyPerson: CompanyPersonEditData;
}

export interface Location {
  id: string;
  address: string;
}

// Order models
export interface OrderData {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  products?: Product[];
}

export interface Product {
  name?: string;
  quantity: number;
  price: number;
}

// Auth response
export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresInMinutes: number;
}

export interface GetCompanyData {
  company: GetCompany;
  companyPerson: GetCompanyDataPerson;
}

export interface GetCompany {
  id: string;
  name: string;
}

export interface GetCompanyDataPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface Result<T> {
  value: T;
  isFailure: boolean;
  isSuccess: boolean;
}

export interface EditLocationRequest {
  id: string;
  address: string;
}

export interface AddLocationRequest {
  address: string;
}
