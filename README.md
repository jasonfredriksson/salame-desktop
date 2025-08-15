# Salame Market

A modern web application for market data visualization and analysis.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

You can install Node.js and npm using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended for managing Node versions).

### Installation

Follow these steps to get the application running on your local machine:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd salame-market-vivo-main

# Step 3: Install the necessary dependencies
npm install
# OR if using yarn
yarn install

# Step 4: Start the development server
npm run dev
# OR if using yarn
yarn dev
```

The application should now be running at `http://localhost:5173` (or another port if 5173 is in use).

### Development Options

**Use your preferred IDE**

Work locally using any code editor or IDE of your choice.

**Edit directly in GitHub**

- Navigate to the desired file(s)
- Click the "Edit" button (pencil icon) at the top right of the file view
- Make your changes and commit them

**Use GitHub Codespaces**

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment
- Edit files directly within the Codespace and commit and push your changes once you're done

## Technology Stack

This project is built with:

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React](https://reactjs.org/) - UI library
- [shadcn-ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Building for Production

To create a production build:

```sh
# Build the application
npm run build
# OR if using yarn
yarn build
```

This will generate optimized files in the `dist` directory that can be deployed to any static hosting service.

## Deployment

You can deploy this application to any static site hosting service like:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

Most services can be connected to your GitHub repository for automatic deployments when you push changes.

## Project Structure

```
salame-market-vivo-main/
├── public/            # Static assets
├── src/               # Source code
│   ├── assets/        # Images and other assets
│   ├── components/    # React components
│   ├── lib/           # Utility functions
│   ├── styles/        # Global styles
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── index.html         # HTML template
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```
