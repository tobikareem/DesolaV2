# Desola Flight Chat - UI

This repository contains the frontend code for the **Desola Flight Chat** application, built using **React** and **TypeScript**.

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
Using Yarn:
```sh
yarn install
```
Or using npm:
```sh
npm install
```

### 🔥 Run the Development Server
```sh
yarn dev
```
Or:
```sh
npm run dev
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
yarn dev

# Build the project
yarn build

# Run tests
yarn test

# Lint and format code
yarn lint && yarn format
```

## 🔗 API Configuration
This project communicates with backend services using environment variables. Create a `.env` file and configure it accordingly:
```sh
VITE_API_BASE_URL=http://localhost:7094/api/
```

## ✅ Code Quality & Formatting
This project uses **ESLint** and **Prettier** for linting and formatting.
```sh
yarn lint
yarn format
```

## 🚀 Deployment
Build and deploy using:
```sh
yarn build
```
This generates a `dist/` folder containing the production-ready application.

## 📜 License
This project is licensed under the **MIT License**.
