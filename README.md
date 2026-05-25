# SipWise

SipWise is a small React application built with Vite. The app uses React Router v7 to render a main layout and a home page.

## Features

- React 19 application with Vite
- Client-side routing using `react-router-dom`
- Simple page structure with `Main` and `Home` routes
- ESLint configured for React development

## Project structure

- `src/App.jsx` - App entry point and router configuration
- `src/page/Main.jsx` - Main layout component with an `Outlet` for nested routes
- `src/page/Home.jsx` - Home page component
- `src/main.jsx` - React app bootstrap file
- `public/` - Static assets

## Getting started

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open the URL shown in the terminal to view the app in the browser.

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Run linting

```bash
pnpm lint
```

## Dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `vite`
- `eslint`

## Notes

This project is currently a simple starter app named SipWise with a branded home screen and placeholder layout. You can extend it by adding pages, routes, and app-specific functionality.
