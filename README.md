# ⚙️ SaaS Frontend Template – React + Vite

A powerful, scalable frontend boilerplate built with **React (18+)** and **Vite (5+)**, designed for **multi-client SaaS platforms** powered by **.NET Core Microservices**.

Supports:

- 🔐 JWT authentication
- 🌐 Dynamic routing
- 🎨 Theme and layout switching per client
- 🧭 Menu rendering from XML
- 📦 API abstraction with interceptors
- 🗂 Client info via appsettings.json
- 🧠 Modern state management (Zustand)
- 🧩 Scalable folder structure

---

## 🏗 Tech Stack

| Layer          | Library/Framework         | Version       |
|----------------|---------------------------|---------------|
| Frontend       | React                     | 18.x          |
| Build Tool     | Vite                      | 5.x           |
| Routing        | React Router DOM          | 6.x           |
| State Mgmt     | Zustand                   | 4.x           |
| Styling        | Tailwind CSS              | 3.x+          |
| HTTP Client    | Axios                     | Latest        |
| Auth           | JWT via API               |               |
| Menu Config    | XML (parsed to JSON)      |               |
| UI Components  | Radix UI + Custom         |               |
| Form Handling  | React Hook Form + Zod     |               |
| Icons          | Lucide React              |               |
| Notifications  | React Hot Toast           |               |

---

## 📁 Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── config/
│   │   ├── appsettings.json
│   │   └── menu.xml
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Analytics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Settings.tsx
│   │   └── Users.tsx
│   ├── router/
│   │   └── AppRouter.tsx
│   ├── services/
│   │   └── api.ts
│   ├── stores/
│   │   ├── appStore.ts
│   │   └── authStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .editorconfig
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## � Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🔐 JWT Authentication Flow

1. User submits login form → Mock API authentication
2. Save JWT to `localStorage` via Zustand store
3. Axios interceptor appends token to headers
4. Private routes check for token
5. Auto logout on token expiration

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `password`

---

## 🧭 Menu Configuration

The application uses XML-based menu configuration for flexibility:

```xml
<menu>
  <item id="dashboard" label="Dashboard" icon="LayoutDashboard" path="/dashboard" />
  <item id="users" label="Users" icon="Users" path="/users" />
  <item id="analytics" label="Analytics" icon="BarChart3" path="/analytics" />
  <item id="settings" label="Settings" icon="Settings" path="/settings">
    <submenu>
      <item id="profile" label="Profile" icon="User" path="/settings/profile" />
      <item id="security" label="Security" icon="Shield" path="/settings/security" />
      <item id="billing" label="Billing" icon="CreditCard" path="/settings/billing" />
    </submenu>
  </item>
</menu>
```

---

## 🎨 Theming & Customization

- **Dark/Light Mode**: Built-in theme toggle
- **CSS Variables**: Easy color customization
- **Tailwind CSS**: Utility-first styling
- **Client Configuration**: Per-client branding via `appsettings.json`

---

## 📦 API Integration

The template includes a mock API service that can be easily replaced with real endpoints:

```typescript
// Mock implementation - replace with real API calls
async login(credentials: LoginCredentials): Promise<LoginResponse> {
  // Replace this with actual API call
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
}
```

---

## 🧠 State Management

Uses **Zustand** for lightweight, type-safe state management:

- `authStore`: Authentication state and actions
- `appStore`: Application settings, theme, and UI state

---

## 🔧 Development Features

- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Hot Reload**: Instant development feedback
- **Path Mapping**: Clean imports with `@/` prefix
- **Responsive Design**: Mobile-first approach

---

## 🌐 Deployment Ready

- **Production Build**: Optimized bundles
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Lazy loading support
- **Modern Browser Support**: ES2020+ features

---

## 📝 License

This project is licensed under the MIT License.


