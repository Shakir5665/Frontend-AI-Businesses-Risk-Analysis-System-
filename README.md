# AI Businesses Risk Analysis System (Frontend)

This is the frontend application for the AI Businesses Risk Analysis System. It provides an intuitive, modern, and interactive interface to analyze risks associated with various AI business models, products, and services.

## Features

- **Landing Page**: A welcoming interface that introduces the risk analysis system.
- **Dashboard**: High-level overview and insights.
- **Analyze Product**: Core feature to submit and analyze AI products/services.
- **Analysis Results**: Detailed breakdown of risks, scores, and recommendations.
- **History**: View past analysis records.
- **Profile & Settings**: Manage user preferences and profile information.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS, Material-UI (@mui/material)
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (if applicable) and navigate to the project directory:
   ```bash
   cd Frontend-AI-Businesses-Risk-Analysis-System-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will run the app locally, typically accessible at `http://localhost:5173`.

### Building for Production

To build the application for production deployment:

```bash
npm run build
```
This will compile the TypeScript code and bundle the assets into the `dist` folder.

To preview the production build:
```bash
npm run preview
```

## Folder Structure

- `/src/pages`: Contains main page components (Dashboard, AnalyzeProduct, History, etc.)
- `/src/components`: Reusable UI components
- `/src/context`: React Context for state management
- `/src/hooks`: Custom React hooks
- `/src/api`: API integration and request handling
- `/src/utils`: Helper functions and utilities
- `/src/assets`: Static assets like images and global styles
