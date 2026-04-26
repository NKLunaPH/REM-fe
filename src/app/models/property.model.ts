export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  type: 'house' | 'apartment' | 'condo' | 'land';
  status: 'available' | 'sold' | 'pending';
  createdDate: Date;
  updatedDate?: Date;
  features: string[];
  agent?: string;
}
