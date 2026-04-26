import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyStateService {
  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  private selectedPropertySubject = new BehaviorSubject<Property | null>(null);
  private filterSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<string>('price-asc');
  private loadingSubject = new BehaviorSubject<boolean>(false);

  properties$ = this.propertiesSubject.asObservable();
  selectedProperty$ = this.selectedPropertySubject.asObservable();
  filter$ = this.filterSubject.asObservable();
  sort$ = this.sortSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.initializeProperties();
  }

  private initializeProperties(): void {
    const initialProperties: Property[] = [
      {
        id: '1',
        title: 'Modern Downtown Apartment',
        description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
        price: 450000,
        location: 'Downtown, City Center',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        type: 'apartment',
        status: 'available',
        createdDate: new Date('2024-01-15'),
        features: ['Gym', 'Pool', 'Security', 'Parking'],
        agent: 'John Doe'
      },
      {
        id: '2',
        title: 'Luxury Family Home',
        description: 'Spacious luxury home with modern amenities, perfect for families.',
        price: 850000,
        location: 'Suburban Heights',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1570129477492-45201003c6c9?w=400',
        type: 'house',
        status: 'available',
        createdDate: new Date('2024-02-10'),
        features: ['Garden', 'Garage', 'Heating', 'Smart Home'],
        agent: 'Jane Smith'
      },
      {
        id: '3',
        title: 'Cozy Studio Apartment',
        description: 'Perfect starter apartment with excellent location and affordable price.',
        price: 280000,
        location: 'Arts District',
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 650,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        type: 'apartment',
        status: 'available',
        createdDate: new Date('2024-03-05'),
        features: ['Hardwood Floors', 'Natural Light'],
        agent: 'Mike Johnson'
      },
      {
        id: '4',
        title: 'Waterfront Condo',
        description: 'Stunning waterfront condo with direct beach access.',
        price: 720000,
        location: 'Beachfront',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2000,
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
        type: 'condo',
        status: 'available',
        createdDate: new Date('2024-01-20'),
        features: ['Ocean View', 'Balcony', 'Pool', 'Gym'],
        agent: 'Sarah Williams'
      },
      {
        id: '5',
        title: 'Development Land',
        description: 'Prime commercial development land in growing area.',
        price: 500000,
        location: 'Commercial District',
        bedrooms: 0,
        bathrooms: 0,
        squareFeet: 10000,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        type: 'land',
        status: 'available',
        createdDate: new Date('2024-02-28'),
        features: ['Corner Lot', 'High Traffic', 'Zoned Commercial'],
        agent: 'David Brown'
      }
    ];
    this.propertiesSubject.next(initialProperties);
  }

  // Get all properties
  getProperties(): Observable<Property[]> {
    return this.properties$;
  }

  // Get filtered and sorted properties
  getFilteredProperties(): Observable<Property[]> {
    return new Observable(observer => {
      this.properties$.subscribe(properties => {
        this.filter$.subscribe(filter => {
          this.sort$.subscribe(sort => {
            let filtered = properties;

            // Apply filter
            if (filter) {
              filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(filter.toLowerCase()) ||
                p.location.toLowerCase().includes(filter.toLowerCase()) ||
                p.type.includes(filter)
              );
            }

            // Apply sort
            const sorted = this.applySorting(filtered, sort);
            observer.next(sorted);
          });
        });
      });
    });
  }

  private applySorting(properties: Property[], sort: string): Property[] {
    const sorted = [...properties];
    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      default:
        return sorted;
    }
  }

  // Get single property
  getPropertyById(id: string): Observable<Property | null> {
    return new Observable(observer => {
      this.properties$.subscribe(properties => {
        const property = properties.find(p => p.id === id) || null;
        observer.next(property);
      });
    });
  }

  // Select property
  selectProperty(property: Property | null): void {
    this.selectedPropertySubject.next(property);
  }

  // Add property
  addProperty(property: Omit<Property, 'id' | 'createdDate'>): void {
    const newProperty: Property = {
      ...property,
      id: this.generateId(),
      createdDate: new Date()
    };

    const currentProperties = this.propertiesSubject.value;
    this.propertiesSubject.next([...currentProperties, newProperty]);
  }

  // Update property
  updateProperty(property: Property): void {
    const currentProperties = this.propertiesSubject.value;
    const updatedProperties = currentProperties.map(p =>
      p.id === property.id ? { ...property, updatedDate: new Date() } : p
    );
    this.propertiesSubject.next(updatedProperties);
  }

  // Delete property
  deleteProperty(id: string): void {
    const currentProperties = this.propertiesSubject.value;
    this.propertiesSubject.next(currentProperties.filter(p => p.id !== id));
  }

  // Set filter
  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  // Set sort
  setSort(sort: string): void {
    this.sortSubject.next(sort);
  }

  // Set loading state
  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Get statistics
  getStatistics(): Observable<any> {
    return new Observable(observer => {
      this.properties$.subscribe(properties => {
        const stats = {
          totalProperties: properties.length,
          averagePrice: properties.reduce((sum, p) => sum + p.price, 0) / properties.length,
          byType: this.groupByType(properties),
          byStatus: this.groupByStatus(properties)
        };
        observer.next(stats);
      });
    });
  }

  private groupByType(properties: Property[]): Record<string, number> {
    return properties.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private groupByStatus(properties: Property[]): Record<string, number> {
    return properties.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
