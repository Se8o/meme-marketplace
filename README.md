# Meme Marketplace PRO

A fully functional application for browsing, filtering, and purchasing meme images.

## Features

- **Login system** - Mock authentication with validation
- **Dashboard** - Overview of statistics and top memes
- **Meme gallery** - Grid display with filters and search
- **Filtering** - By name, category, and rating
- **Meme detail** - Extended information and related memes
- **Shopping cart** - Item management with localStorage
- **Private routes** - Page protection for non-authenticated users
- **Responsive design** - Mobile, tablet, desktop

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

## Login

To log in, use:
- **Username**: minimum 3 characters (e.g. "admin")
- **Password**: minimum 5 characters (e.g. "12345")

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Card.jsx
│   ├── ErrorMessage.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   └── PrivateRoute.jsx
├── context/           # React Context
│   └── CartContext.jsx
├── hooks/             # Custom hooks
│   ├── useDebounce.js
│   ├── useFetch.js
│   └── useLocalStorage.js
├── pages/             # Application pages
│   ├── Cart.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── MemeDetail.jsx
│   ├── Memes.jsx
│   └── NotFound.jsx
├── App.jsx            # Main component with routing
├── App.css            # Styles
├── index.css          # Global styles
└── main.jsx           # Entry point
```

## Technologies

- **React** - UI library
- **React Router** - Routing
- **Context API** - State management
- **localStorage** - Persistent data
- **Imgflip API** - Meme data

## Responsiveness

- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns

## Routes

- `/login` - Public login page
- `/dashboard` - Dashboard with overview (private)
- `/memes` - List of memes with filters (private)
- `/memes/:id` - Meme detail (private)
- `/cart` - Shopping cart (private)
- `*` - 404 Not Found

## Custom Hooks

1. **useFetch** - Loading data from API
2. **useLocalStorage** - Working with localStorage
3. **useDebounce** - Debouncing for search

## Design

The application uses clean CSS with modern design, gradient backgrounds, and animations.

## Notes

- Memes are loaded from public API
- Rating and categories are randomly generated
- Price is calculated as: rating × 25 CZK
- Cart data is saved to localStorage
