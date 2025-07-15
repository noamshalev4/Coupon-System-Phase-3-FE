# 🎟️ Coupon System Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-6.2.1-007FFF?style=for-the-badge&logo=mui&logoColor=white)

**Modern React TypeScript Frontend for Coupon Management System**

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The application will be available at `http://localhost:5173`

---

## 🏗️ Architecture Overview

### Component Structure
```
Components/
├── AdminArea/           # Administrator dashboard & management
│   ├── AddCompany/     # Company creation form
│   ├── AddCustomer/    # Customer creation form
│   ├── CompanyList/    # Company management table
│   ├── CustomerList/   # Customer management table
│   ├── UpdateCompany/  # Company editing form
│   └── UpdateCustomer/ # Customer editing form
├── CompanyArea/         # Company dashboard & coupon management
│   ├── AddCoupon/      # Coupon creation form
│   ├── CompanyDetails/ # Company profile management
│   ├── CouponsList/    # Company's coupon inventory
│   └── UpdateCoupon/   # Coupon editing form
├── CustomerArea/        # Customer interface
│   ├── AllCouponList/  # Browse all available coupons
│   ├── CustomerDetails/# Customer profile management
│   └── MyCouponList/   # Customer's purchased coupons
└── Shared/             # Reusable UI components
    ├── CompanyCard/    # Company display card
    ├── CouponCard/     # Coupon display card
    ├── CustomerCard/   # Customer display card
    ├── Header/         # Navigation header
    ├── Footer/         # Site footer
    ├── SideMenu/       # Navigation sidebar
    ├── LayOut/         # Main layout wrapper
    ├── Routing/        # Route configuration
    └── NotFound/       # 404 error page
```

### State Management (Redux)
```
Redux/
├── AdminStore.ts     # Admin operations state
├── AuthStore.ts      # Authentication & user session
├── CompanyStore.ts   # Company data management
└── CustomerStore.ts  # Customer data management
```

### Data Models
```
Model/
├── CompanyModel.ts        # Company entity interface
├── CouponModel.ts         # Coupon entity interface
├── CustomerModel.ts       # Customer entity interface
├── LoginRequestModel.ts   # Authentication request
└── LoginResponseModel.ts  # Authentication response
```

### Services Layer
```
Service/
├── AdminService.ts      # Admin API calls
├── CompanyService.ts    # Company API calls
├── CustomerService.ts   # Customer API calls
├── LoginService.ts      # Authentication API
├── AxiosInstance.ts     # HTTP client configuration
└── NotificationService.ts # Toast notifications
```

---

## 🎯 Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based route protection (Admin/Company/Customer)
- Secure session management
- Logout with token cleanup

### 📱 Responsive Design
- Mobile-first approach
- Material-UI components
- Consistent design system
- Cross-browser compatibility

### 🛠️ Developer Experience
- **Hot Module Replacement** with Vite
- **TypeScript** for type safety
- **ESLint** for code quality
- **Form validation** with React Hook Form + Zod
- **Error boundaries** for graceful error handling

### 🔄 State Management
- **Redux Toolkit** for predictable state updates
- **Immer** for immutable state mutations
- **Redux DevTools** integration
- Optimistic updates for better UX

---

## 🧩 Tech Stack Details

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| TypeScript | 5.6.2 | Type Safety |
| Vite | 6.0.1 | Build Tool |
| Material-UI | 6.2.1 | UI Components |

### State & Data Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Redux Toolkit | 2.2.6 | State Management |
| React Redux | 9.1.2 | React-Redux Bindings |
| Axios | 1.7.2 | HTTP Client |

### Forms & Validation
| Technology | Version | Purpose |
|------------|---------|---------|
| React Hook Form | 7.54.2 | Form Management |
| Zod | 3.24.1 | Schema Validation |
| Hookform Resolvers | 3.9.1 | Form Validation Bridge |

### UI & UX
| Technology | Version | Purpose |
|------------|---------|---------|
| React Router DOM | 6.24.1 | Client-side Routing |
| React Toastify | 10.0.5 | Notifications |
| React Icons | 5.4.0 | Icon Library |
| Moment.js | 2.30.1 | Date Handling |

---

## 🎨 Styling Architecture

### Material-UI Theme
- Custom color palette
- Responsive breakpoints
- Component style overrides
- Dark/Light theme support

### CSS Organization
```
src/
├── App.css          # Global application styles
├── index.css        # Root styles & CSS reset
└── Components/
    └── [Component]/
        ├── Component.tsx
        └── Component.css    # Component-specific styles
```

---

## 🔧 Development Workflow

### Code Organization Principles
1. **Component Co-location**: Each component has its own directory with TypeScript and CSS files
2. **Separation of Concerns**: Clear separation between UI, state, and business logic
3. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
4. **Reusability**: Shared components and utilities to avoid code duplication

### Naming Conventions
- **Components**: PascalCase (e.g., `CouponCard.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Interfaces**: PascalCase with "Model" suffix (e.g., `CouponModel`)
- **Enums**: PascalCase (e.g., `ClientType`)

### Project Structure Best Practices
- **Feature-based organization** for complex areas (Admin/Company/Customer)
- **Shared components** for reusable UI elements
- **Centralized services** for API communication
- **Type definitions** in dedicated Model directory

---

## 🚦 Environment Configuration

### Development
```bash
# Development server with HMR
npm run dev
```

### Production
```bash
# Type-check and build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🤝 Contributing to Frontend

### Setup Development Environment
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make your changes
5. Run tests and linting
6. Submit a pull request

### Code Style Guidelines
- Follow existing TypeScript patterns
- Use Material-UI components when possible
- Implement proper error handling
- Add appropriate TypeScript types
- Write self-documenting code

---

## 📝 Notes

### Vite Configuration
- Fast HMR for development
- Optimized production builds
- TypeScript support out of the box
- ESLint integration

### ESLint Configuration
- React-specific rules
- TypeScript-aware linting
- Hook rules for React best practices
- Import/export validation

---

<div align="center">

**Built with modern React ecosystem best practices**

*This frontend provides a solid foundation for the Coupon System with scalable architecture and excellent developer experience.*

</div>
