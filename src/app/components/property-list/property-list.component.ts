import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyStateService } from '../../services/property-state.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  properties$!: Observable<Property[]>;
  loading$!: Observable<boolean>;
  searchQuery = '';
  sortOption = 'price-asc';
  filterType = '';
  filterStatus = '';

  propertyTypes = ['house', 'apartment', 'condo', 'land'];
  propertyStatuses = ['available', 'sold', 'pending'];

  constructor(
    private propertyState: PropertyStateService,
    private router: Router
  ) {
    this.properties$ = this.propertyState.getFilteredProperties();
    this.loading$ = this.propertyState.loading$;
  }

  ngOnInit(): void {
    this.propertyState.setFilter('');
    this.propertyState.setSort('price-asc');
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.propertyState.setFilter(query);
  }

  onSortChange(sort: string): void {
    this.sortOption = sort;
    this.propertyState.setSort(sort);
  }

  onFilterTypeChange(type: string): void {
    this.filterType = type;
    this.applyFilters();
  }

  onFilterStatusChange(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    let filterQuery = '';
    if (this.filterType) {
      filterQuery = this.filterType;
    }
    this.propertyState.setFilter(filterQuery);
  }

  viewPropertyDetails(property: Property): void {
    this.propertyState.selectProperty(property);
    this.router.navigate(['/property', property.id]);
  }

  addNewProperty(): void {
    this.router.navigate(['/add-property']);
  }

  deleteProperty(event: Event, property: Property): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${property.title}"?`)) {
      this.propertyState.deleteProperty(property.id);
    }
  }

  editProperty(event: Event, property: Property): void {
    event.stopPropagation();
    this.router.navigate(['/edit-property', property.id]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'sold':
        return 'status-sold';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}
