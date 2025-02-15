# Next.js 14 Project (RecipeHub)

## 📌 Project Overview

This is a **Next.js 14** RecipeHub project with a structured and scalable architecture. It follows the App Router paradigm and utilizes modern best practices for efficient development.

## 🚀 Features

- **Next.js 14 with App Router** for server-side rendering (SSR) and static site generation (SSG)
- **State management** with redux
- **Custom hooks** for reusable logic
- **Lazy loading** and **code splitting** for performance optimization
- **Validation utilities** for form handling
- **Service layer** for API handling
- **Form Handeling** using react-hook-form
- **Styling** using tailwind css and setup the theme
- **Optimization** using memo, lazy-loading, server component

---

## 📂 Folder Structure

```
📦 src
 ├── 📂 app        # Next.js App Router pages and layouts
 ├── 📂 components # Reusable UI components
 ├── 📂 constants  # Static constants and config values
 ├── 📂 hooks      # Custom React hooks
 ├── 📂 services   # API calls and backend interactions
 ├── 📂 store      # State management (Redux-Toolkit)
 ├── 📂 utils      # Utility/helper functions
 ├── 📂 validations # Validation schemas
```

---

## 🛠️ Installation & Setup

### IMP: make sure to have .env config properly

```sh
# .env.development.sample
NEXT_PUBLIC_BASE_URL = backend_url
```

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Abhiadi12/reciepe-app.git
cd recipe-nextjs-ui
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Development Server

```sh
npm run dev
```

Server will start at `http://localhost:3000` 🚀

---

## 📝 linting and prettier

1. eslint rules used. (.eslintrc.json)
2. prettier is used to formatting the code. (.prettierrc)

---

## 📧 Contact

For any queries, feel free to reach out at **abhisek.m@mindfiresolutions.com** or create an issue in the repository.
