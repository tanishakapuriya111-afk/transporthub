# Transportation Website - Project Structure

This project follows a clean, organized folder structure for better maintainability and scalability.

## 📁 Folder Structure

```
src/
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── LoginModal.js        # Login modal component
│   │   ├── RegistrationModal.js # Registration modal component
│   │   └── index.js            # Auth components exports
│   ├── common/                  # Reusable common components
│   ├── layout/                  # Layout components
│   │   └── Navbar.js           # Navigation bar component
│   └── ...
├── styles/
│   └── styles.css              # Main stylesheet
├── hooks/
│   └── useAuth.js              # Custom hook for auth state
├── utils/
│   └── constants.js            # Application constants
├── context/                    # React context providers
├── App.js                      # Main application component
└── README.md                   # This file
```

## 🧩 Components

### Authentication Components (`/components/auth/`)
- **LoginModal**: Handles user login with email/password
- **RegistrationModal**: Handles user registration with form validation
- **index.js**: Centralized exports for clean imports

### Layout Components (`/components/layout/`)
- **Navbar**: Main navigation with logo and auth buttons

## 🎣 Custom Hooks (`/hooks/`)
- **useAuth**: Manages authentication modal states and transitions

## 🛠️ Utilities (`/utils/`)
- **constants.js**: Centralized constants for text, navigation items, etc.

## 🎨 Styles (`/styles/`)
- **styles.css**: Main stylesheet with all component styles

## 📦 Benefits of This Structure

1. **Modularity**: Each component has its own file and responsibility
2. **Reusability**: Common components can be easily reused
3. **Maintainability**: Clear separation of concerns
4. **Scalability**: Easy to add new features and components
5. **Clean Imports**: Index files provide clean import paths

## 🚀 Usage Examples

```javascript
// Import auth components
import { LoginModal, RegistrationModal } from './components/auth';

// Import layout components
import Navbar from './components/layout/Navbar';

// Import custom hooks
import { useAuth } from './hooks/useAuth';

// Import constants
import { AUTH_CONSTANTS, NAV_CONSTANTS } from './utils/constants';
``` 