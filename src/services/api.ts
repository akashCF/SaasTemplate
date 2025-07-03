import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, LoginCredentials, LoginResponse, User } from '@/types';
import { authStore } from '@/stores/authStore';
import { toast } from 'react-hot-toast';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'https://api.example.com/v1'; // This will be replaced with real endpoints

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = authStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          authStore.getState().logout();
          toast.error('Session expired. Please login again.');
        } else if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.');
        }
        return Promise.reject(error);
      }
    );
  }

  // Mock authentication endpoints
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Mock implementation - replace with real API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const mockResponse: LoginResponse = {
          user: {
            id: '1',
            email: credentials.email,
            name: 'John Doe',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            clientId: 'demo-client',
            permissions: ['read', 'write', 'admin']
          },
          tokens: {
            accessToken: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600
          }
        };
        return mockResponse;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async logout(): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    // Mock implementation
    return Promise.resolve({ accessToken: 'new-mock-token' });
  }

  async getCurrentUser(): Promise<User> {
    // Mock implementation
    const mockUser: User = {
      id: '1',
      email: 'admin@example.com',
      name: 'John Doe',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      clientId: 'demo-client',
      permissions: ['read', 'write', 'admin']
    };
    return mockUser;
  }

  // Mock data endpoints
  async getUsers(): Promise<User[]> {
    // Mock users data
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'John Doe',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        clientId: 'demo-client',
        permissions: ['read', 'write', 'admin']
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'Jane Smith',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        clientId: 'demo-client',
        permissions: ['read']
      }
    ];
    return mockUsers;
  }

  async getDashboardStats() {
    // Mock dashboard stats
    return {
      totalUsers: 1234,
      activeUsers: 856,
      revenue: 52430,
      growth: 12.5
    };
  }

  // Generic HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.api.get(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}

export const apiService = new ApiService();
