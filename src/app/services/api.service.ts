import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Property } from '../models/property.model';

export interface LoginResponse {
  user: {
    user_id: number;
    full_name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties`);
  }

  getProperty(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}`);
  }

  createProperty(
    property: Omit<Property, 'id' | 'createdDate' | 'updatedDate'>
  ): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/properties`, property);
  }

  updateProperty(property: Property): Observable<Property> {
    return this.http.put<Property>(
      `${this.apiUrl}/properties/${property.id}`,
      property
    );
  }

  deleteProperty(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      `${this.apiUrl}/properties/${id}`
    );
  }
}
