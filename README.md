# Recipes React

A modern recipe management application built with React and Vite, featuring fast refresh and an intuitive user interface for browsing and managing recipes.

## 🚀 Features

- **Fast Development**: Built with Vite for lightning-fast HMR (Hot Module Replacement)
- **Modern React**: Utilizes the latest React features and best practices
- **Recipe Management**: Browse, create, and manage recipes
- **Admin Dashboard**: Administrative interface for managing content
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **React** - UI library for building interactive interfaces
- **Vite** - Next-generation frontend tooling
- **ESLint** - Code linting and quality assurance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation

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

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

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
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── assets/         # Static assets (images, fonts, etc.)
│   └── App.jsx         # Main application component
├── public/             # Public static files
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies
└── eslint.config.js    # ESLint configuration
```

## 🔌 Vite Plugins

This project uses official Vite plugins for React:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** - Uses Babel for Fast Refresh
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)** - Uses SWC for Fast Refresh (alternative)

## 🎯 Usage

### Browsing Recipes
1. Navigate to the main page to view available recipes
2. Click on any recipe card to view detailed information
3. Use search and filter options to find specific recipes

### Admin Functions
1. Log in with admin credentials
2. Access the admin dashboard
3. Create, edit, or delete recipes


## 👤 Author

**NAK110**

- GitHub: [@NAK110](https://github.com/NAK110)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- All contributors who help improve this project

---

Made with ❤️ by NAK110
