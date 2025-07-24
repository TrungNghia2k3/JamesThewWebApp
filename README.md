# 🍳 James Thew Chef API Documentation (Frontend)

A comprehensive API documentation web application for the James Thew Chef platform, featuring role-based authentication, interactive endpoint testing, and real-time API exploration.

---

## ✨ Key Features
- **Interactive API Documentation** - Explore 90+ endpoints across 6 access levels
- **Role-Based Authentication** - Test different user roles (Public, General, Subscriber, Writer, Staff, Admin)
- **Live API Testing** - Try endpoints directly in the browser with real authentication
- **Dynamic Request Forms** - Auto-generated forms based on endpoint specifications
- **Syntax Highlighting** - Beautiful code display for requests and responses
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Token Management** - Handle multiple role tokens simultaneously

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4.1.5
- **Routing:** React Router DOM 7.6.3
- **Icons:** Heroicons 2.2.0
- **Code Highlighting:** React Syntax Highlighter 15.6.1
- **Development:** ESLint, Modern JavaScript (ES Modules)

---

## 📁 Project Structure Highlights
- `components/`: Reusable UI components
  - `docs/`: API documentation specific components (Sidebar, MainContent, RightPanel)
  - `home/`: Homepage components (HeroSection, FeaturesGrid, StatsSection)
- `data/`: API endpoint definitions and documentation data
  - `endpoints/`: Categorized endpoint definitions (public, admin, staff, writer, subscriber, general)
- `hooks/`: Custom React hooks for state management
- `pages/`: Main page components (Home, Docs)
- `utils/`: Utility functions (tokenManager for authentication)

---

## 🔐 API Access Levels
The application documents and tests 6 distinct access levels:

| Level | Role | Features | Endpoints |
|-------|------|----------|-----------|
| 🌐 **Public** | Anyone | Recipe browsing, user registration, basic search | 12+ |
| 👤 **General User** | GENERAL | Profile management, comments, favorites, history | 8+ |
| ⭐ **Subscriber** | SUBSCRIBER | Premium recipes, contest participation, meal plans | 15+ |
| ✍️ **Writer** | WRITER | Article & recipe creation, content management | 10+ |
| 🛠️ **Staff** | STAFF | Content moderation, recipe management, user support | 25+ |
| 👑 **Admin** | ADMIN | Full system access, user management, system config | 30+ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd JamesThewWebApplication

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🎯 Purpose & Features

This application was built to demonstrate:

### 📚 **Comprehensive API Documentation**
- Complete documentation for 90+ endpoints
- Detailed request/response examples
- Parameter validation and type checking
- Role-based access control visualization

### 🔧 **Interactive Testing Environment**
- Real-time API endpoint testing
- Multi-role authentication system
- Dynamic form generation based on endpoint specs
- Live request/response visualization

### 🎨 **Modern UI/UX Design**
- Clean, professional interface using Tailwind CSS
- Responsive design for all device sizes
- Intuitive navigation and user experience
- Syntax-highlighted code examples

### 🏗️ **Scalable Architecture**
- Component-based React architecture
- Custom hooks for state management
- Modular endpoint definitions
- Easy to extend and maintain

---

## 🌐 Live API Integration

The application connects to the live James Thew Chef API:
- **Base URL:** `https://jamesthewwebapi.onrender.com/api`
- **Authentication:** JWT Bearer tokens
- **Content Type:** JSON/Form-data support
- **Real-time Testing:** All endpoints are live and functional

---

## 🌐 Live Demo
- **Visit the live website:** [Website](https://james-thew-web-app.vercel.app/)

---

## 📱 Key Components

### **Documentation Interface**
- **Sidebar Navigation** - Browse endpoints by category and role
- **Main Content Area** - Detailed endpoint documentation
- **Right Panel** - Interactive testing with role-based authentication

### **Homepage Features**
- **Hero Section** - Introduction and quick access to documentation
- **Features Grid** - Visual showcase of platform capabilities
- **Access Levels** - Clear explanation of role-based permissions
- **Statistics** - Platform metrics and feature highlights

---

## 🔑 Authentication Flow

1. **Role Selection** - Choose from 6 different user roles
2. **Quick Login** - Pre-configured credentials for each role
3. **Token Management** - Automatic JWT token handling
4. **Endpoint Testing** - Role-appropriate endpoint access
5. **Real Responses** - Live data from the API backend

---

## 🎨 Design Philosophy

- **User-Centric:** Intuitive interface for developers and API consumers
- **Professional:** Clean, modern design suitable for technical documentation
- **Responsive:** Mobile-first approach ensuring accessibility across devices
- **Interactive:** Hands-on experience with live API testing capabilities

---

## 🔧 Development Notes

### **State Management**
- Custom hooks for complex state logic
- Local storage integration for token persistence
- React Context for theme management

### **API Integration** 
- Fetch-based HTTP client
- Dynamic header management
- Error handling and response formatting
- Multi-format request body support

### **Code Quality**
- ESLint configuration for consistent code style
- Component-based architecture for reusability
- Modern JavaScript features and best practices

---

This project showcases a complete frontend solution for API documentation, combining beautiful design with practical functionality to create an exceptional developer experience.
