# Recipes React

A modern recipe management application built with React and Vite, featuring a RESTful API integration with JWT authentication and role-based access control.

## 🚀 Features

- **Fast Development**: Built with Vite for lightning-fast HMR (Hot Module Replacement)
- **Modern React**: Utilizes the latest React features and best practices
- **Recipe Management**: Browse, create, edit, and delete recipes with full CRUD operations
- **User Authentication**: JWT-based authentication with login/register functionality
- **Role-Based Access**: Admin and user roles with appropriate permissions
- **User Management**: Admin interface for managing users
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **API Integration**: Seamless integration with Express.js backend

## 🛠️ Tech Stack

- **React** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Next-generation frontend tooling
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **JWT Decode** - JWT token handling
- **ESLint** - Code linting and quality assurance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running (see [Backend Repository](https://github.com/NAK110/recipes_expressjs))

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/NAK110/recipes_react.git
cd recipes_react
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your backend API URL
VITE_API_URL=http://localhost:3001/api
```

4. Ensure the backend server is running:
   - Clone and set up the [backend repository](https://github.com/NAK110/recipes_expressjs)
   - Follow the backend setup instructions
   - The backend should be running on `http://localhost:3001`

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🔑 Admin Access

To access the admin panel, use the following credentials:

- **Username**: `nak110`
- **Password**: `password`


## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
recipes_react/
├── src/
│   ├── api/                # API integration layer
│   │   ├── config/         # Axios configuration
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript type definitions
│   ├── app/                # App layout components
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication components
│   │   ├── recipe/         # Recipe management components
│   │   ├── user/           # User management components
│   │   └── ui/             # Shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   │   ├── auth/           # Login/Register pages
│   │   ├── dashboard/      # Dashboard page
│   │   ├── recipes/        # Recipe pages
│   │   └── users/          # User management pages
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Public static files
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── eslint.config.js        # ESLint configuration
```

## 🔌 Backend Integration

This frontend application integrates with an Express.js backend API:

- **Backend Repository**: [recipes_expressjs](https://github.com/NAK110/recipes_expressjs)
- **API Endpoints**: RESTful API with full CRUD operations
- **Authentication**: JWT-based authentication system
- **Database**: MySQL database with Knex.js ORM
- **Security**: Rate limiting, input validation, and security headers

### API Endpoints Used:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe (Admin)
- `PUT /api/recipes/:id` - Update recipe (Admin)
- `DELETE /api/recipes/:id` - Delete recipe (Admin)
- `GET /api/users` - Get all users (Admin)
- `POST /api/users` - Create user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

Make sure the backend server is running on the specified port.

## 🎯 Usage

### Authentication
1. **Register**: Create a new account with username, email, and password
2. **Login**: Access your account with username and password
3. **Role-based Access**: Users have different permissions based on their role (user/admin)

### Recipe Management
1. **Browse Recipes**: View all available recipes in the recipe page
2. **View Recipe Details**: Click on any recipe to see detailed information
3. **Create Recipes**: Admin users can add new recipes with ingredients and instructions
4. **Edit Recipes**: Admin users can modify existing recipes
5. **Delete Recipes**: Admin users can remove recipes

### User Management (Admin Only)
1. **View Users**: Access the user management page
2. **Create Users**: Add new users with specific roles
3. **Edit Users**: Modify user information and roles
4. **Delete Users**: Remove users from the system

### API Features
- **JWT Authentication**: Secure token-based authentication
- **Automatic Token Management**: Tokens are automatically attached to requests
- **Error Handling**: Comprehensive error handling for API calls
- **Role-based Permissions**: Different API access based on user roles


## 👤 Author

**NAK110**

- GitHub: [@NAK110](https://github.com/NAK110)
- Frontend Repository: [recipes_react](https://github.com/NAK110/recipes_react)
- Backend Repository: [recipes_expressjs](https://github.com/NAK110/recipes_expressjs)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- Shadcn/ui for the beautiful component library
- Tailwind CSS for the utility-first CSS framework
- All contributors who help improve this project

---

Made with ❤️ by NAK110
