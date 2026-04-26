# Real Estate Management System - Architecture Guide

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Angular Application                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Router Outlet (App)                     │  │
│  │                                                      │  │
│  │  Routes:                                           │  │
│  │  / → PropertyListComponent                         │  │
│  │  /property/:id → PropertyDetailComponent           │  │
│  │  /add-property → AddEditPropertyComponent          │  │
│  │  /edit-property/:id → AddEditPropertyComponent     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Root Component (App)                 │
│                    imports: [RouterOutlet]                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                ┌──────────┴──────────┬───────────────┐
                │                     │               │
        ┌───────▼────────┐    ┌───────▼─────┐   ┌───▼──────┐
        │ PropertyList   │    │  Property   │   │ Add/Edit │
        │  Component     │    │   Detail    │   │ Property │
        │                │    │ Component   │   │Component │
        │ • Display grid │    │             │   │          │
        │ • Search       │    │ • Show info │   │ • Form   │
        │ • Filter       │    │ • Edit btn  │   │ • Valid  │
        │ • Sort         │    │ • Delete    │   │ • Submit │
        │ • Quick actions│    │ • Contact   │   │          │
        └────────┬───────┘    └─────┬───────┘   └─────┬────┘
                 │                  │                 │
                 └──────────────────┴─────────────────┘
                           │
                  ┌────────▼────────────┐
                  │ PropertyStateService│
                  │  (State Management) │
                  │                     │
                  │ • properties$       │
                  │ • selectedProperty$ │
                  │ • filter$           │
                  │ • sort$             │
                  │ • loading$          │
                  │                     │
                  │ • addProperty()     │
                  │ • updateProperty()  │
                  │ • deleteProperty()  │
                  │ • getPropertyById() │
                  └────────┬────────────┘
                           │
                  ┌────────▼────────────┐
                  │   Property Model    │
                  │ (TypeScript Interface)
                  └─────────────────────┘
```

---

## 🔄 Data Flow Architecture

### Adding a Property

```
User Interface
      │
      ▼
┌──────────────────────────────────┐
│ AddEditPropertyComponent         │
│ • Form submission (onSubmit())   │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ PropertyStateService             │
│ • addProperty() method           │
│ • Validate input data            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ BehaviorSubject<Property[]>      │
│ • Update state                   │
│ • Emit new value                 │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ Observable Properties$           │
│ • Subscribers notified           │
│ • AsyncPipe updates template     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ UI Re-renders                    │
│ • New property appears in list   │
└──────────────────────────────────┘
```

### Viewing Property Details

```
User Clicks Property Card
      │
      ▼
┌──────────────────────────────────┐
│ PropertyListComponent             │
│ • viewPropertyDetails()           │
│ • selectProperty()                │
│ • Router.navigate()               │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ PropertyStateService             │
│ • getPropertyById(id)            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ Observable: Property | null      │
│ • Subscribe to changes           │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ PropertyDetailComponent          │
│ • Receives property data         │
│ • AsyncPipe renders template     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ UI Displays                      │
│ • Image, specs, features         │
│ • Agent info, actions            │
└──────────────────────────────────┘
```

---

## 🗂️ File Structure with Relationships

```
src/app/
│
├── models/
│   └── property.model.ts
│       └─ Used by: Service, Components
│
├── services/
│   └── property-state.service.ts
│       ├─ Manages: properties$, filters, sorting
│       ├─ Used by: All components
│       └─ Depends on: Property model
│
├── components/
│   │
│   ├── property-list/
│   │   ├── property-list.component.ts
│   │   │   ├─ Uses: PropertyStateService
│   │   │   ├─ Uses: Angular Router
│   │   │   ├─ Imports: Common, Forms
│   │   │   └─ Subscribes to: properties$, loading$
│   │   │
│   │   ├── property-list.component.html
│   │   │   └─ Displays: Property cards, filters
│   │   │
│   │   └── property-list.component.scss
│   │       └─ Styles: Grid layout, cards, responsive
│   │
│   ├── property-detail/
│   │   ├── property-detail.component.ts
│   │   │   ├─ Uses: PropertyStateService
│   │   │   ├─ Uses: ActivatedRoute (get :id)
│   │   │   ├─ Uses: Router
│   │   │   └─ Subscribes to: selectedProperty$
│   │   │
│   │   ├── property-detail.component.html
│   │   │   └─ Displays: Full property info
│   │   │
│   │   └── property-detail.component.scss
│   │       └─ Styles: Detail view layout
│   │
│   └── add-edit-property/
│       ├── add-edit-property.component.ts
│       │   ├─ Uses: PropertyStateService
│       │   ├─ Uses: FormBuilder (Reactive Forms)
│       │   ├─ Uses: ActivatedRoute (for :id)
│       │   ├─ Uses: Router
│       │   └─ Calls: addProperty() or updateProperty()
│       │
│       ├── add-edit-property.component.html
│       │   └─ Displays: Form with validation
│       │
│       └── add-edit-property.component.scss
│           └─ Styles: Form layout
│
├── app.routes.ts
│   ├─ Routes PropertyListComponent to /
│   ├─ Routes PropertyDetailComponent to /property/:id
│   ├─ Routes AddEditPropertyComponent to /add-property
│   ├─ Routes AddEditPropertyComponent to /edit-property/:id
│   └─ Redirects ** to /
│
├── app.config.ts
│   ├─ Provides: Router
│   └─ Provides: Global error listeners
│
├── app.ts (Root Component)
│   ├─ Imports: RouterOutlet
│   ├─ Template: <router-outlet></router-outlet>
│   └─ Bootstraps: All components via routes
│
├── app.scss
│   └─ Global app styles
│
└── app.html
    └─ Template: <router-outlet></router-outlet>

src/
├── styles.scss (Global styles)
├── main.ts (Bootstrap application)
└── index.html (HTML entry point)
```

---

## 🔌 Dependency Injection

```
┌─────────────────────────────────────┐
│   Angular Dependency Injector       │
│   (Manages service instances)       │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────────────────┐
       │                            │
┌──────▼──────────────┐   ┌─────────▼──────────────┐
│ PropertyStateService│   │ Angular Router Service │
│ (Singleton)        │   │ (Built-in)             │
│                    │   │                        │
│ @Injectable()      │   │ Injected into:         │
│ providedIn: 'root' │   │ • Components           │
│                    │   │ • ActivatedRoute       │
│ Injected into:     │   │ • RouteParams          │
│ • PropertyList     │   │                        │
│ • PropertyDetail   │   │                        │
│ • AddEditProperty  │   │                        │
└────────────────────┘   └────────────────────────┘
```

---

## 📈 State Management Flow

```
┌──────────────────────────────────────────────┐
│      PropertyStateService                    │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  BehaviorSubjects (Internal State)     │ │
│  │                                        │ │
│  │  propertiesSubject                     │ │
│  │  ├─ Current value: Property[]          │ │
│  │  ├─ Subscribers: PropertyListComponent │ │
│  │  ├─ Subscribers: PropertyDetailComponent
│  │  └─ Subscribers: Service methods      │ │
│  │                                        │ │
│  │  selectedPropertySubject               │ │
│  │  ├─ Current value: Property | null    │ │
│  │  └─ Subscribers: PropertyDetailComp   │ │
│  │                                        │ │
│  │  filterSubject                         │ │
│  │  ├─ Current value: string             │ │
│  │  └─ Subscribers: List component       │ │
│  │                                        │ │
│  │  sortSubject                           │ │
│  │  ├─ Current value: string             │ │
│  │  └─ Subscribers: List component       │ │
│  │                                        │ │
│  │  loadingSubject                        │ │
│  │  ├─ Current value: boolean            │ │
│  │  └─ Subscribers: All components       │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Observables (Public Interface)        │ │
│  │                                        │ │
│  │  properties$ = propertiesSubject$      │ │
│  │  selectedProperty$ = selectedProperty$ │ │
│  │  filter$ = filterSubject$              │ │
│  │  sort$ = sortSubject$                  │ │
│  │  loading$ = loadingSubject$            │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Public Methods                        │ │
│  │                                        │ │
│  │  addProperty(property)                 │ │
│  │  updateProperty(property)              │ │
│  │  deleteProperty(id)                    │ │
│  │  setFilter(filter)                     │ │
│  │  setSort(sort)                         │ │
│  │  getPropertyById(id)                   │ │
│  │  getFilteredProperties()               │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 🎯 Component Lifecycle

### PropertyListComponent
```
1. OnInit
   ├─ Initialize filter and sort
   ├─ Subscribe to properties$
   └─ Subscribe to loading$

2. OnDestroy (if implemented)
   ├─ Unsubscribe from observables
   └─ Clean up resources

3. User Interaction
   ├─ Search → setFilter()
   ├─ Sort → setSort()
   ├─ Click property → navigate()
   └─ Delete → deleteProperty()
```

### PropertyDetailComponent
```
1. OnInit
   ├─ Get :id from route params
   ├─ Call getPropertyById(id)
   └─ Subscribe to observable

2. Display Data
   ├─ Property info rendered
   ├─ Status badge shown
   └─ Agent info displayed

3. User Actions
   ├─ Edit → navigate()
   ├─ Delete → deleteProperty()
   └─ Back → navigate()
```

### AddEditPropertyComponent
```
1. OnInit
   ├─ Check if edit mode (id in params)
   ├─ If edit: load property data
   └─ Initialize form

2. Form State
   ├─ User fills fields
   ├─ Validation runs
   └─ Errors shown

3. Submit
   ├─ Validate form
   ├─ Call service (add/update)
   └─ Navigate to list
```

---

## 🔀 Routing Flow

```
User Navigates to /
        │
        ▼
┌───────────────────────────────────┐
│ Angular Router                    │
│ • Matches route: /                │
│ • Loads: PropertyListComponent    │
└───────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│ PropertyListComponent             │
│ • Displays property list          │
│ • User clicks card                │
│ • Calls: router.navigate()        │
└───────────────────────────────────┘
        │
        ▼
User Navigates to /property/1
        │
        ▼
┌───────────────────────────────────┐
│ Angular Router                    │
│ • Matches: /property/:id          │
│ • Extracts: id = 1                │
│ • Loads: PropertyDetailComponent  │
│ • Provides: ActivatedRoute        │
└───────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│ PropertyDetailComponent           │
│ • Reads :id from params           │
│ • Calls: getPropertyById(id)      │
│ • Displays: Property details      │
└───────────────────────────────────┘
```

---

## 📱 Responsive Design Architecture

```
SCSS Media Queries
│
├─ Desktop (1200px+)
│  ├─ 3-4 column grid
│  ├─ Full width filters
│  └─ Horizontal layout
│
├─ Tablet (768px - 1199px)
│  ├─ 2 column grid
│  ├─ Stacked filters
│  └─ Flexible layout
│
├─ Mobile (480px - 767px)
│  ├─ 1 column grid
│  ├─ Full width items
│  └─ Vertical layout
│
└─ Small Mobile (<480px)
   ├─ Single column
   ├─ Compact spacing
   └─ Optimized touch
```

---

## 🎨 SCSS Architecture

```
Component SCSS Files
│
├─ Variables
│  ├─ Colors ($primary-color, etc.)
│  ├─ Sizes ($border-radius, etc.)
│  └─ Animations ($transition, etc.)
│
├─ Utility Styles
│  ├─ Buttons
│  ├─ Forms
│  ├─ Badges
│  └─ Cards
│
├─ Component Specific
│  ├─ Layout styles
│  ├─ Typography
│  └─ Effects
│
└─ Responsive Rules
   ├─ Tablet breakpoint
   ├─ Mobile breakpoint
   └─ Small mobile breakpoint
```

---

## ✅ Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Centralized state management
- ✅ Type-safe TypeScript
- ✅ Responsive design
- ✅ Scalable component structure
- ✅ Efficient data flow
- ✅ Professional styling

---

**Architecture Diagram Generated: April 2026**
