# 🍔 React Burger — Burger Store App Built with React

**React Burger** is a learning-oriented single-page application developed using React. This project simulates an online burger shop, allowing users to browse the catalog, choose patty sizes, apply filters, sort items, and manage a shopping cart.

---

## 🚀 Project Purpose

This app was built as part of my journey in mastering modern frontend development with React. It focuses on hands-on experience with component architecture, state management, API integration, and UI responsiveness.

---

## 🔧 Tech Stack

- ⚛️ **React** (with Hooks & Functional Components)
- 🛠 **Redux Toolkit** for state management
- 🔁 **React Router** for client-side routing
- 🌐 **Axios** for API requests
- 🎨 **SCSS / CSS Modules** for styling
- 🛒 Cart logic with dynamic count and total price
- 🔍 Search, filter, and sorting functionality
- 📱 (Partial) mobile responsiveness

---

## ✅ Features

- Product listing with burger images, weight options, and descriptions
- Filtering by category (Meat, Vegetarian, Grill, Spicy, etc.)
- Sorting by popularity and price
- Full-text search by burger name
- Add to cart with visual counter and total cost
- Clean and simple UI
> 🛠 Originally started as a pizza store project, this app was later adapted to showcase **burgers**. Some variable names or constants may still refer to "pizza" — they now correspond to **burgers**.

---

## 🗂 Project Structure

```
src/
├── assets/              # Static files (images, SVG icons)
│   └── img/
├── Components/          # Reusable UI components
│   ├── Cart/
│   ├── Categories/
│   ├── EmptyCart/
│   ├── Header/
│   ├── NotFoundBlock/
│   ├── Notification/
│   ├── Pagination/
│   ├── PizzaBlock/      # (Burger components, name kept for legacy reasons)
│   ├── Search/
│   └── Sort/
├── ejs/                 # Server-side templates (for optional SSR)
│   └── components/
├── js/                  # Main entry point (app.js)
├── pages/               # Application pages (using React Router)
│   ├── FullPizza.tsx    # Burger details page
│   ├── Home.tsx         # Main product listing
│   └── NotFound.tsx     # 404 fallback page
├── Redux/               # Redux store and slices
│   ├── slices/
│   └── store.ts
├── scss/                # SCSS styling
│   ├── components/
│   ├── libs/
│   ├── _variables.scss
│   └── app.scss
├── types/               # TypeScript types and declarations
│   └── images.d.ts
```

## 💻 Getting Started

```bash
git clone https://github.com/your-username/react-burger.git
cd react-burger
npm install
npm start
```

Open `http://localhost:3000` to view it in the browser.

---

## 📝 Notes

- You may still encounter some naming like `pizza`, especially in variable or file names — that’s due to the initial pizza theme. Functionality and content are fully adapted for **burgers**.
- This is a frontend-focused educational project and does not include a production backend.

---

## 🖼 Screenshots

### 🏠 Home Page  
Browse all available burgers with filters and search functionality.
![image](https://github.com/user-attachments/assets/c75b66c8-3ea2-4f0b-ad97-482eac7b197d)

### 🛒 Cart Page  
Review and manage selected items with real-time price calculation.
![image](https://github.com/user-attachments/assets/c929a33b-7145-4290-937e-20e86b4a3716)
![image](https://github.com/user-attachments/assets/e8b9a49a-5128-4826-8eff-188019e8b010)

> Make sure to place your screenshots in a `/screenshots` folder inside your project root or `/public` if you are using Create React App.

---

## 📬 Contact

If you’d like to ask questions, provide feedback, or collaborate:

**Anton Gruzdev**  
📧 [your-email@example.com](mailto:your-email@example.com)  
🔗 [LinkedIn](#) | [Telegram](#)
