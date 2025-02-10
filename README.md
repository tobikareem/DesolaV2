# Desola Flight Chat - UI

This repository contains the frontend code for the **Desola Flight Chat** application, built using **React** and **TypeScript**.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or later) ➜ [Download](https://nodejs.org/)
- **Yarn** or **npm**

### 📥 Clone the Repository
```sh
git clone https://github.com/tobikareem/DesolaV2.git
cd DesolaV2
```

### 📦 Install Dependencies
Using npm:
```sh
npm install
```
Or using Yarn:
```sh
yarn install
```

### 🔥 Run the Development Server
```sh
npm run dev
```
Or:
```sh
yarn dev
```
The app should now be running at **http://localhost:3000/**.

## 🏗 Project Structure
```
📦 desola-flight-chat-ui
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 pages       # Application pages
 ┃ ┣ 📂 hooks       # Custom React hooks
 ┃ ┣ 📂 services    # API calls and business logic
 ┃ ┣ 📂 utils       # Helper functions
 ┃ ┣ 📜 App.tsx     # Root component
 ┃ ┣ 📜 main.tsx    # Entry point
 ┣ 📜 package.json  # Dependencies and scripts
 ┣ 📜 tsconfig.json # TypeScript configuration
 ┗ 📜 README.md     # Project documentation
```

## 🛠 Scripts
```sh
# Start the development server
npm run dev

# Build the project
npm run build

# Run tests
npm run test

# Lint and format code
npm run lint && npm run format
```

## 🔗 API Configuration
This project communicates with backend services using environment variables. Create a `.env` file and configure it accordingly:
```sh
VITE_API_BASE_URL=http://localhost:7094/api/
```

## ✅ Code Quality & Formatting
This project uses **ESLint** and **Prettier** for linting and formatting.
```sh
npm run lint
npm run format
```

## 🚀 Deployment
Build and deploy using:
```sh
npm run build
```
This generates a `dist/` folder containing the production-ready application.

## 📜 License
This project is licensed under the **MIT License**.
