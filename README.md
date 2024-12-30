# Document Manager Application

This is a **Document Manager Application** that allows users to view, drag-and-drop, and manage documents in a dynamic and interactive interface. The frontend is built with **React** and **TypeScript**, and uses tools like **MSW (Mock Service Worker)** for API mocking, enabling seamless testing and development without a real backend server.

---

## Project Overview

This project is a document management system where users can:
- View documents in a card grid.
- Drag and drop documents to reorder them.
- Open a detailed overlay with images for each document.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Development Setup](#development-setup)
- [How to Run the Project](#how-to-run-the-project)
- [MSW Setup](#msw-setup)
- [Frontend Architecture](#frontend-architecture)
- [File Structure](#file-structure)
- [Custom Hooks](#custom-hooks)
- [Contributing](#contributing)

---

## Features

- **Interactive Document Grid**: Display documents with drag-and-drop functionality.
- **Document Overlay**: On clicking the document thumbnail, an overlay with a detailed image is shown.
- **Mock API with MSW**: The project uses **Mock Service Worker (MSW)** to simulate API responses for fetching and saving documents. This helps in testing and development without a real backend.
- **Responsive Design**: The application is designed to be fully responsive across various screen sizes.
- **Document Save & Auto-Save**: The documents are saved via the mock API, and auto-save functionality is built in to save changes periodically.

---

## Technologies Used

- **React**: The core UI library used to build the frontend.
- **TypeScript**: TypeScript is used for type safety and to ensure better development practices.
- **Mock Service Worker (MSW)**: Used for intercepting HTTP requests and mocking API responses during development and testing.
- **CSS Modules**: For styling and scoping CSS in components.
- **useState, useEffect**: React hooks to manage state and side effects.


### Prerequisites

- Node.js (v14.x or later)
- npm or yarn

### How to run the project 

git clone https://github.com/romabulani/zania.git
cd zania
npm install
npm start

### Frontend Architecture
As the Frontend Developer, I have set up the application structure to ensure scalability, maintainability, and ease of collaboration.

Key Components:
App.tsx: The main entry point of the application, handling the document grid, drag-and-drop context, and overlay management.

CardGrid.tsx: Displays a grid of documents. It uses react-beautiful-dnd to handle the drag-and-drop functionality for reordering documents.

Card.tsx: Represents an individual document card. It includes an image thumbnail, title, and an event handler for opening the overlay when the thumbnail is clicked.

ImageOverlay.tsx: A modal component that displays a larger image when a document's thumbnail is clicked.

Custom Hook: This project makes use of custom hooks for better state management and reusability:
              useDocuments.ts:
              A custom React hook that manages the state of documents.
              Handles fetching documents, saving changes, and managing auto-save functionality.
              Abstracts the logic of interacting with the API (mocked by MSW), making the components cleaner and more focused on the UI.

### File Structure

/public
  mockServiceWorker.js            # The Service Worker file generated by MSW
/src
  /components
    Card.tsx                      # A single document card component
    CardGrid.tsx                  # The grid displaying all document cards
    ImageOverlay.tsx              # Modal overlay for the document images
  /hooks
    useDocuments.ts               # Custom hook for managing document state
  /mocks
    /handlers.ts                  # Mock API response handlers
    /browser.ts                   # Service worker setup for MSW
  App.tsx                         # Main app component
  index.tsx                       # Entry point for the app
  styles/
    app.css                       # Main CSS file for styling
  data.json                       # Mock data for documents
  package.json                    # Project dependencies and scripts
  README.md                       # Project documentation

