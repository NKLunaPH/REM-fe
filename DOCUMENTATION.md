# Real Estate Management System

A comprehensive, modern Real Estate Management System built with **Angular**, **TypeScript**, **SCSS**, and **HTML**. This application provides a complete solution for managing property listings with features like property browsing, detailed views, and CRUD operations.

## 🏠 Features

### Core Features
- **Property Listing**: Browse all available properties with advanced filtering and sorting
- **Property Details**: View comprehensive information about each property
- **Add New Properties**: Create new property listings with detailed information
- **Edit Properties**: Modify existing property details
- **Delete Properties**: Remove properties from the system
- **Advanced Search**: Search properties by title, location, or type
- **Sorting Options**: Sort by price (ascending/descending) and newest first
- **State Management**: Centralized state management using RxJS and Angular Services

### Property Management
- **Property Types**: House, Apartment, Condo, Land
- **Property Status**: Available, Pending, Sold
- **Detailed Information**:
  - Title and description
  - Price
  - Location with GPS support
  - Bedrooms and bathrooms
  - Square footage
  - Features and amenities
  - Agent information
  - Image URLs
  - Creation and update dates

### UI/UX Features
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Modern Styling**: Beautiful gradient backgrounds and smooth animations
- **Status Badges**: Visual indicators for property status
- **Quick Actions**: Edit and delete buttons for easy management
- **Loading States**: Visual feedback during data operations
- **Form Validation**: Comprehensive form validation with error messages
- **Clean Navigation**: Intuitive routing and navigation

## 🏗️ Project Structure

```
real-estate-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── property-list/
│   │   │   │   ├── property-list.component.ts
│   │   │   │   ├── property-list.component.html
│   │   │   │   └── property-list.component.scss
│   │   │   ├── property-detail/
│   │   │   │   ├── property-detail.component.ts
│   │   │   │   ├── property-detail.component.html
│   │   │   │   └── property-detail.component.scss
│   │   │   └── add-edit-property/
│   │   │       ├── add-edit-property.component.ts
│   │   │       ├── add-edit-property.component.html
│   │   │       └── add-edit-property.component.scss
│   │   ├── models/
│   │   │   └── property.model.ts
│   │   ├── services/
│   │   │   └── property-state.service.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.scss
│   ├── styles.scss
│   ├── main.ts
│   └── index.html
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Angular CLI (v18+)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd real-estate-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200/` to view the application.

## 📝 Usage

### Viewing Properties
1. The home page displays all available properties in a grid layout
2. Use the search box to find properties by title, location, or type
3. Use the filter dropdown to filter by property type
4. Use the sort dropdown to arrange properties by price or newest first

### Viewing Property Details
1. Click on any property card to view its full details
2. View comprehensive information including description, features, and agent info
3. From the detail page, you can edit or delete the property

### Adding a New Property
1. Click the "Add New Property" button on the home page
2. Fill in all required fields marked with *
3. Add features separated by commas (e.g., "Gym, Pool, Security")
4. Click "Add Property" to save

### Editing a Property
1. Click the edit button (✏️) on a property card or from the detail page
2. Modify the required information
3. Click "Update Property" to save changes

### Deleting a Property
1. Click the delete button (🗑️) on a property card or from the detail page
2. Confirm the deletion when prompted
3. The property will be removed from the system

## 🎨 Styling

### Design System
- **Primary Color**: #3498db (Blue)
- **Secondary Color**: #2c3e50 (Dark Gray)
- **Success Color**: #27ae60 (Green)
- **Danger Color**: #e74c3c (Red)
- **Light Gray**: #ecf0f1
- **Border Radius**: 8px
- **Transitions**: 0.3s ease

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 📱 Components

### PropertyListComponent
Displays a grid of properties with:
- Search functionality
- Sorting options
- Type filtering
- Status filtering
- Quick edit/delete actions

### PropertyDetailComponent
Shows detailed information about a selected property including:
- Large property image
- Full description
- Comprehensive specs (beds, baths, sqft)
- Features and amenities
- Agent contact information
- Quick action buttons

### AddEditPropertyComponent
A comprehensive form for creating and editing properties with:
- Form validation
- Error messages
- Real-time form state tracking
- Pre-population for edit mode

## 🔄 State Management

### PropertyStateService
Handles all state management using RxJS BehaviorSubjects:
- `properties$`: All properties in the system
- `selectedProperty$`: Currently selected property
- `filter$`: Current filter value
- `sort$`: Current sort value
- `loading$`: Loading state

### Key Methods
- `getProperties()`: Get all properties
- `getFilteredProperties()`: Get properties with applied filters/sorts
- `getPropertyById()`: Get a specific property
- `selectProperty()`: Set the selected property
- `addProperty()`: Add a new property
- `updateProperty()`: Update existing property
- `deleteProperty()`: Remove a property
- `setFilter()`: Apply search filter
- `setSort()`: Apply sorting
- `getStatistics()`: Get property statistics

## 🔧 Technologies Used

- **Angular**: v18+ (Latest Angular framework)
- **TypeScript**: For type-safe development
- **SCSS**: For advanced styling with variables and mixins
- **RxJS**: For reactive programming and state management
- **Angular Router**: For client-side routing
- **Angular Forms**: For form handling and validation

## 💡 Key Features Implementation

### Reactive Forms
Uses Angular's Reactive Forms module for robust form handling:
- Form builder for programmatic form creation
- Built-in validation with error handling
- Dynamic form control management

### Observables and RxJS
- Implements reactive patterns using Observables
- AsyncPipe for automatic subscription management
- Proper cleanup and resource management

### Standalone Components
All components are built as standalone, reducing bundle size and improving code organization.

### SCSS Features
- SCSS variables for consistent theming
- Mixins for reusable styles
- Responsive grid layouts
- Smooth transitions and animations
- CSS Grid and Flexbox for layouts

## 🧪 Building and Deployment

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

### Running Tests
```bash
ng test
```

## 📚 Additional Notes

### Sample Data
The application comes with 5 pre-populated sample properties to demonstrate functionality. These can be modified in the `PropertyStateService.initializeProperties()` method.

### Future Enhancements
- Backend API integration
- User authentication
- Advanced filtering with multiple criteria
- Favorites/wishlist functionality
- Property comparison tool
- Image upload capability
- Map integration
- Real-time notifications

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a comprehensive Real Estate Management System demo with Angular.

---

**Happy Property Management! 🏡**
