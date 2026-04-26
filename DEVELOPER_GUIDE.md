# Real Estate Management System - Developer Guide

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
ng serve
```

### Step 3: Open Browser
Navigate to `http://localhost:4200/`

---

## 📦 Available npm Commands

### Development
```bash
# Start development server with live reload
ng serve

# Start with open browser
ng serve --open

# Serve with production optimizations
ng serve --configuration production
```

### Building
```bash
# Development build
ng build

# Production build (optimized for performance)
ng build --configuration production

# Build with source maps for debugging
ng build --source-map
```

### Testing
```bash
# Run unit tests with Karma
ng test

# Run tests with code coverage
ng test --code-coverage

# Run specific test file
ng test --include='**/property-list.component.spec.ts'
```

### Code Quality
```bash
# Run linter
ng lint

# Format code with prettier
prettier --write "src/**/*.ts"
```

### Other Utilities
```bash
# Analyze bundle size
ng build --stats-json && webpack-bundle-analyzer dist/real-estate-system/stats.json

# Update Angular and dependencies
ng update @angular/cli @angular/core

# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service
```

---

## 🏗️ Project Architecture

### Component Hierarchy
```
App (Root)
├── PropertyListComponent
│   └── Search, Filter, Sort, Card Grid
├── PropertyDetailComponent
│   └── Image, Info, Actions, Agent
└── AddEditPropertyComponent
    └── Form with Validation
```

### Service Architecture
```
PropertyStateService (Singleton)
├── State (BehaviorSubjects)
│   ├── properties$
│   ├── selectedProperty$
│   ├── filter$
│   ├── sort$
│   └── loading$
└── Methods
    ├── CRUD Operations
    ├── Filtering & Sorting
    └── Statistics
```

### Data Flow
```
User Interaction
    ↓
Component Event
    ↓
Service Method Call
    ↓
State Update (BehaviorSubject)
    ↓
Observable Subscription
    ↓
Template Update (AsyncPipe)
```

---

## 🎯 Component Details

### PropertyListComponent (`src/app/components/property-list/`)

**Responsibilities:**
- Display list of properties in grid
- Handle search, filter, and sort operations
- Manage property card interactions

**Key Methods:**
- `onSearch(query)` - Filter properties by search query
- `onSortChange(sort)` - Change sorting method
- `viewPropertyDetails()` - Navigate to property detail
- `addNewProperty()` - Navigate to add property form
- `editProperty()` - Navigate to edit form
- `deleteProperty()` - Delete property with confirmation

**Observable Subscriptions:**
- `properties$` - Filtered and sorted properties
- `loading$` - Loading state indicator

---

### PropertyDetailComponent (`src/app/components/property-detail/`)

**Responsibilities:**
- Display comprehensive property information
- Provide action buttons (edit, delete, contact)
- Show property specifications and features

**Key Methods:**
- `goBack()` - Navigate back to list
- `editProperty()` - Navigate to edit mode
- `deleteProperty()` - Delete with confirmation
- `contactAgent()` - Trigger agent contact (alert)

**Route Parameters:**
- `:id` - Property ID from URL

---

### AddEditPropertyComponent (`src/app/components/add-edit-property/`)

**Responsibilities:**
- Provide form for creating/editing properties
- Validate user input
- Handle form submission

**Form Fields:**
- Basic Information: title, description, location, imageUrl
- Details: price, type, status, bedrooms, bathrooms, squareFeet
- Additional: features, agent

**Features:**
- Reactive form with validation
- Error message display
- Edit mode pre-population
- Dynamic title based on mode

---

## 📊 State Management Details

### PropertyStateService

**State Observables:**
```typescript
properties$: Observable<Property[]>          // All properties
selectedProperty$: Observable<Property | null> // Selected property
filter$: Observable<string>                   // Current filter
sort$: Observable<string>                     // Current sort
loading$: Observable<boolean>                 // Loading state
```

**Core Methods:**

```typescript
// Read Operations
getProperties(): Observable<Property[]>
getFilteredProperties(): Observable<Property[]>
getPropertyById(id: string): Observable<Property | null>
getStatistics(): Observable<{...}>

// Write Operations
addProperty(property: Omit<Property, 'id' | 'createdDate'>): void
updateProperty(property: Property): void
deleteProperty(id: string): void

// State Mutations
selectProperty(property: Property | null): void
setFilter(filter: string): void
setSort(sort: string): void
setLoading(loading: boolean): void
```

---

## 🎨 Styling Guidelines

### SCSS Variables
```scss
$primary-color: #2c3e50      // Main color
$secondary-color: #3498db    // Accent color
$success-color: #27ae60      // Success state
$danger-color: #e74c3c       // Danger state
$light-gray: #ecf0f1         // Light backgrounds
$dark-gray: #95a5a6          // Text/borders
```

### Responsive Mixins
```scss
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 480px) { /* Mobile */ }
```

### Common Patterns
- Use CSS Grid for layouts
- Flexbox for component alignment
- Smooth transitions (0.3s ease)
- Border radius (8px default)

---

## 🔍 Debugging Tips

### Debug Observables
```typescript
// In component
properties$ = this.service.getFilteredProperties().pipe(
  tap(props => console.log('Properties:', props))
);
```

### Check Component State
1. Open Angular DevTools (Chrome extension)
2. Navigate to Components tab
3. Select component to inspect properties and methods

### Browser Console
```javascript
// Check service state
// Will be available if using public property
```

### Network Tab
- Monitor API calls (when backend is connected)
- Check response times and data

---

## 📋 Common Workflows

### Adding a New Feature

1. **Create Component:**
   ```bash
   ng generate component components/my-feature
   ```

2. **Create Service (if needed):**
   ```bash
   ng generate service services/my-service
   ```

3. **Add Routing:**
   Update `app.routes.ts` with new route

4. **Implement Template & Logic:**
   - Add HTML to `.component.html`
   - Add styles to `.component.scss`
   - Implement logic in `.component.ts`

5. **Test:**
   ```bash
   ng test
   ```

### Modifying State Management

1. Add new BehaviorSubject to `PropertyStateService`
2. Create getter method returning Observable
3. Create setter method to update state
4. Subscribe in components using AsyncPipe

### Styling a Component

1. Define SCSS variables at top of file
2. Use mobile-first approach (mobile styles first, then larger screens)
3. Ensure proper spacing and alignment
4. Test on multiple screen sizes

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
ng serve --port 4300
```

### Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures
```bash
# Clear build cache
rm -rf .angular/cache
ng build
```

### TypeScript Errors
```bash
# Check TypeScript version
tsc --version

# Update TypeScript
npm install typescript@latest
```

---

## 📈 Performance Tips

1. **Use OnPush Change Detection:**
   ```typescript
   changeDetection: ChangeDetectionStrategy.OnPush
   ```

2. **Unsubscribe from Observables:**
   Use `takeUntil` operator or `OnDestroy` lifecycle hook

3. **Lazy Load Components:**
   Implement route-based lazy loading

4. **Optimize Images:**
   Use appropriate formats and sizes

5. **Tree Shaking:**
   Keep unused imports clean

---

## 🔐 Security Considerations

1. **Input Validation:** Always validate user input
2. **CSRF Protection:** Implement when adding backend
3. **XSS Prevention:** Angular automatically sanitizes inputs
4. **Sensitive Data:** Don't store in localStorage
5. **API Security:** Use HTTPS and token-based auth

---

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Router Guide](https://angular.io/guide/router)

---

## 💬 Support

For issues or questions:
1. Check the component documentation
2. Review the DOCUMENTATION.md file
3. Check Angular official documentation
4. Review component code comments

---

**Happy Coding! 🚀**
