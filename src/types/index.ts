import { ReactNode } from 'react';

// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  clientId: string;
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

// Client configuration types
export interface ClientConfig {
  id: string;
  name: string;
  logo: string;
  theme: string;
  features: {
    dashboard: boolean;
    users: boolean;
    settings: boolean;
    analytics: boolean;
    billing: boolean;
  };
  customization: {
    primaryColor: string;
    secondaryColor: string;
    layout: 'sidebar' | 'topbar';
  };
}

export interface ApiConfig {
  baseUrl: string;
  version: string;
  timeout: number;
}

export interface AuthConfig {
  tokenKey: string;
  refreshTokenKey: string;
  tokenExpiry: number;
}

export interface AppSettings {
  client: ClientConfig;
  api: ApiConfig;
  auth: AuthConfig;
}

// Menu types
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  submenu?: MenuItem[];
}

// API types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// Common UI types
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}
