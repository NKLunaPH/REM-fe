import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyStateService } from '../../services/property-state.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-add-edit-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.scss']
})
export class AddEditPropertyComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  propertyId: string | null = null;
  loading = false;
  submitted = false;

  propertyTypes = ['house', 'apartment', 'condo', 'land'];
  propertyStatuses = ['available', 'sold', 'pending'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propertyState: PropertyStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      bedrooms: [0, [Validators.required, Validators.min(0)]],
      bathrooms: [0, [Validators.required, Validators.min(0)]],
      squareFeet: [0, [Validators.required, Validators.min(1)]],
      type: ['apartment', Validators.required],
      status: ['available', Validators.required],
      imageUrl: ['', Validators.required],
      features: [''],
      agent: ['', Validators.required]
    });
  }

  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.propertyId = params['id'];
        this.isEditMode = true;
        this.loadProperty(params['id']);
      }
    });
  }

  private loadProperty(id: string): void {
    this.loading = true;
    this.propertyState.getPropertyById(id).subscribe(property => {
      if (property) {
        this.form.patchValue({
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          squareFeet: property.squareFeet,
          type: property.type,
          status: property.status,
          imageUrl: property.imageUrl,
          features: property.features.join(', '),
          agent: property.agent
        });
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const features = formValue.features
      ? formValue.features.split(',').map((f: string) => f.trim())
      : [];

    if (this.isEditMode && this.propertyId) {
      const updatedProperty: Property = {
        id: this.propertyId,
        ...formValue,
        features,
        createdDate: new Date()
      };
      this.propertyState.updateProperty(updatedProperty);
    } else {
      const newProperty: Omit<Property, 'id' | 'createdDate'> = {
        ...formValue,
        features
      };
      this.propertyState.addProperty(newProperty);
    }

    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control?.hasError('minLength')) {
      return `${controlName} is too short`;
    }
    if (control?.hasError('min')) {
      return `${controlName} must be a valid number`;
    }
    return '';
  }
}
