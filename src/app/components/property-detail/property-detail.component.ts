import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyStateService } from '../../services/property-state.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyState: PropertyStateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.propertyState.getPropertyById(id).subscribe(property => {
        this.property = property;
        this.loading = false;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/property-list']);
  }

  editProperty(): void {
    if (this.property) {
      this.router.navigate(['/edit-property', this.property.id]);
    }
  }

  deleteProperty(): void {
    if (this.property && confirm(`Are you sure you want to delete "${this.property.title}"?`)) {
      this.propertyState.deleteProperty(this.property.id);
      this.router.navigate(['/property-list']);
    }
  }

  contactAgent(): void {
    alert(`Contact ${this.property?.agent || 'Agent'} for more information`);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
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
}
